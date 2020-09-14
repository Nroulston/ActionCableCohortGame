class Game < ApplicationRecord
  serialize :code
  has_many :players
end
#todo work on getting a function going in the database possibly use eval, the Function constructor maybe, also possibly just storing the entirety as a serialized json object and trying to create an instance of a game from the class that way. 