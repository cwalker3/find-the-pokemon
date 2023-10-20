class GamesController < ApplicationController
  def create
    game = Game.create
    if game.valid?
      render json: game
    else
      render json: { errors: game.erros.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    games = Game.order(score: :desc).limit(10)
    render json: games
  end

  def check_input
    game = Game.find(params[:id])
    game.check_input(params[:input])
    render json: game
  end

  def start
    game = Game.find(params[:id])
    game.start_game
    render json: game
  end

  def update_name
    game = Game.find(params[:id])
    game.name = params[:name]
    game.save
  end
end
