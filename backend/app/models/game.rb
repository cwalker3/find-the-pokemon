POKEMON_COUNT = 300
TARGET_COUNT = 3
ALL_IDS = (1..1010).to_a
GAME_DURATION = 180

class Game < ApplicationRecord
  before_create :initialize_game
  validate :check_time_remaining, on: :check_input

  def initialize_game
    initialize_pokemon_ids()
    initialize_target_ids()
  end

  def start_game
    if time_started.nil?
      update(time_started: Time.now)
    end
  end

  def time_remaining
    return 0 if time_started.nil?

    elapsed_time = Time.now - time_started
    [GAME_DURATION - elapsed_time, 0].max.to_i
  end

  def check_time_remaining
    if time_started.nil?
      errors.add(:time_started, "The game hasn't started yet.")
    elsif time_remaining <= 0
      errors.add(:time_started, "Time has run out.")
    end
  end

  #recieves an id, and if one of targets, increases score, updates targets
  def check_input(id)
    if self.target_ids.include?(id.to_i)
      update(score: self.score + 1)
      replace_target_id(id.to_i)
    end
  end

  def replace_target_id(id)
    available_ids = self.available_ids
    new_target_id = available_ids.delete(available_ids.sample)
    update(available_ids: available_ids)
    target_ids = self.target_ids.map do |target_id|
      if target_id ==  id
        new_target_id
      else
        target_id
      end
    end
    update(target_ids: target_ids)
  end

  def as_json(_options={})
    { 
      id: self.id,
      pokemon_ids: self.pokemon_ids,
      target_ids: self.target_ids,
      score: self.score,
      name: self.name,
      time_remaining: time_remaining
    }
  end

  def initialize_pokemon_ids
    pokemon_ids = []
    all_ids_copy = ALL_IDS.dup
    POKEMON_COUNT.times do 
      pokemon_ids << all_ids_copy.delete(all_ids_copy.sample)
    end
    self.pokemon_ids = pokemon_ids
  end

  def initialize_target_ids
    target_ids = []
    available_ids = self.pokemon_ids.dup
    TARGET_COUNT.times do
      target_ids << available_ids.delete(available_ids.sample)
    end
    self.target_ids = target_ids
    self.available_ids = available_ids
  end
end