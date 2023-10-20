class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :score, default: 0
      t.string :name, default: 'Anonymous'
      t.integer :target_ids, array: true, default: []
      t.datetime :time_started
      t.integer :available_ids, array: true, default: []

      t.timestamps
    end
  end
end
