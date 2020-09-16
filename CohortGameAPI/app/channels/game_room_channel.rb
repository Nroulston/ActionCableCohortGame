class GameRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "gameroom_channel"
  end

  def unsubscribed
   
  end


  def receive(data)
    console.log(data)
  end
end
