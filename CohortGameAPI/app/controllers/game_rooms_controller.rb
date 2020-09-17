class GameRoomsController < ApplicationController
  before_action :set_game_room, only: [:show, :update, :destroy]

  # GET /game_rooms
  def index
    @game_rooms = GameRoom.all

    render json: @game_rooms
  end

  # GET /game_rooms/1
  def show
    render json: @game_room
  end

  # POST /game_rooms
  def create
    @game_room = GameRoom.new(game_room_params)

    if @game_room.save
      render json: @game_room, status: :created, location: @game_room
    else
      render json: @game_room.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /game_rooms/1
  def update
   
    data = params['gameRoomInstance']
    @game_room.turn = data.turn
    @game_room.currentGame = data.currentGame
    @game_room.save
    ActionCable.server.broadcast('Trivia_channel', {turn: @game_room.turn, currentGame: @game_room.currentGame})
    
  end

  # DELETE /game_rooms/1
  def destroy
    @game_room.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game_room
      @game_room = GameRoom.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def game_room_params
      params.require(:game_room).permit(:name)
    end
end
