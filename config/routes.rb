Rails.application.routes.draw do
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  get '/logout',  to: 'sessions#destroy'

  match '/users/destroy', :to => "users#destroy", via: [:get, :post]
  resources :users

  root 'events#index'

  match '/event_members/search', :to => "event_members#search", via: [:get, :post]

  namespace :api do
    namespace :v1 do
      resources :events
    end
  end

  resources :events do
    resources :event_members
    resources :users
  end

  resources :invites, only: [:new, :create]
end
