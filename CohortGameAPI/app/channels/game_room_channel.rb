class GameRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end


  def receive(data)
    console.log(data)
  end
end
