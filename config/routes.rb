Rails.application.routes.draw do
  root 'welcome#index'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/dashboard', to: 'schedules#index'
  get '/scheduling/:id', to: 'schedules#show'

  resources :users, only: [:create, :show]
  namespace :api do
    namespace :v1 do
      resources :schedules, only: [:index, :create, :update, :destroy], defaults: { format: :json }
      resources :timeslots, only: [:show, :create, :update, :destroy], defaults: { format: :json }
    end
  end

end
