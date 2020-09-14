Rails.application.routes.draw do
  resources :games
  root 'game_rooms#index'
  resources :players
  resources :game_rooms

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
