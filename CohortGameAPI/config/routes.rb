Rails.application.routes.draw do
  root 'game_rooms#index'
  resources :players
  resources :game_rooms

  mount ActionCable.server, at: '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
