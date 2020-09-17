class PlayersController < ApplicationController
  before_action :set_player, only: [:show, :update, :destroy]

  # GET /players
  def index
    players = Player.all
  
    render json: players, include: [:game_room]
  end

  # GET /players/1
  def show
    render json: player
  end

  # POST /players
  def create
   
    room = GameRoom.find(1)
    player = room.players.build(player_params)

    if player.save
      ActionCable.server.broadcast('gameroom_channel', {name: player.name, id: player.id})
      render json: player, include: [:game_room], status: :created, location: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /players/1
  def update
    if @player.update(player_params)
      render json: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /players/1
  def destroy
    byebug
    @player.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      player = Player.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def player_params
      params.require(:player).permit(:name)
    end
end
