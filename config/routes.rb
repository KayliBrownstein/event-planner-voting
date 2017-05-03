Rails.application.routes.draw do
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  get '/logout',  to: 'sessions#destroy'

  # get 'current_user' => "users#current_user"

  # match '/users/destroy', :to => "users#destroy", via: [:get, :post]
  resources :users

  root 'home#show'

  # match '/event_members/search', :to => "event_members#search", via: [:get, :post]

  # match '/events/new', :to => "events#new", via: [:get, :post]

  get 'events/:id/edit', to: 'events#edit', as: :edit_event
  put 'events/:id', to: 'events#update', as: :update_event

  namespace :api do
    namespace :v1 do
      resources :profiles
      resources :users
      resources :events do
        resources :locations
        resources :datetimes
      end
    end
  end

  resources :events

  resources :invites, only: [:new, :create]
end
