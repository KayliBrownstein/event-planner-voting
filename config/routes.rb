Rails.application.routes.draw do
  get  '/signup',  to: 'users#new'
  post '/signup',  to: 'users#create'

  get  '/users/edit',  to: 'users#edit'
  post  '/users/edit',  to: 'users#edit'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  get '/logout',  to: 'sessions#destroy'

  match '/users/destroy', :to => "users#destroy", via: [:get, :post]

  root 'home#show'

  put 'events/:id', to: 'events#update', as: :update_event
  get 'events/:id/edit', to: 'events#edit', as: :edit_event
  get 'events/:id/invite', to: 'invites#new'

  namespace :api do
    namespace :v1 do
      resources :users, except: [:edit]
      resources :locationvotes
      resources :datetimevotes
      resources :searches
      resources :events do
        resources :locations
        resources :datetimes
      end
    end
  end

  resources :users
  resources :events
  resources :invites
end
