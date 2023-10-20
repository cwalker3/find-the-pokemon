Rails.application.routes.draw do
  resources :games, only: [:create, :index]

  post '/games/:id/check_input/:input', to: 'games#check_input', as: 'check_game_input'
  post '/games/:id/start', to: 'games#start', as: 'start_game'
  post '/games/:id/update_name/:name', to: 'games#update_name', as: 'update_name'
end
