class TriviaChannel < ApplicationCable::Channel
  def subscribed
    stream_from "Trivia_channel"
  end

  def unsubscribed
    #when you call cable.disconnect on the client you hit here. current_user is available. You still need to figure out a way to get them hooked up.
  end
end
