class Game < ApplicationRecord
  serialize :code
  has_many :players
end
#todo honestly just start making your games class, then make your games extend from that class add all your methods and instance methods. See if you can  store all the games in a super class vairable in the toplevel game class. 

#todo work on getting a function going in the database possibly use eval, the Function constructor maybe, also possibly just storing the entirety as a serialized json object and trying to create an instance of a game from the class that way. 