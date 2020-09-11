class GameRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "GameRoom_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    
  end
end
