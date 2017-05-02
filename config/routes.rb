Rails.application.routes.draw do
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  get '/logout',  to: 'sessions#destroy'

  # get 'current_user' => "users#current_user"

  # match '/users/destroy', :to => "users#destroy", via: [:get, :post]
  resources :users

  root 'events#index'

  # match '/event_members/search', :to => "event_members#search", via: [:get, :post]

  # match '/events/new', :to => "events#new", via: [:get, :post]

  namespace :api do
    namespace :v1 do
      resources :profiles
      resources :events
      resources :users
    end
  end

  resources :events
  #   resources :event_members
  #   resources :users
  #   resources :locations
  #   resources :datetimes
  # end

  resources :invites, only: [:new, :create]
end
