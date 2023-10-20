class AddPokemonIdsToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :pokemon_ids, :integer, array: true, default: []
  end
end
