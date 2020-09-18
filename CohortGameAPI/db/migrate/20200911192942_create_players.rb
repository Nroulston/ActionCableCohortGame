class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :game_room_id
      t.string :game_for_turn_tracker
      t.integer :turn_tracker
      t.timestamps
    end
  end
end
