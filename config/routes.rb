Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :events
    end
  end

  resources :events do
    resources :users
  end
  
  root 'events#index'
end
