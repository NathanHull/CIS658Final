Rails.application.routes.draw do
  resources :companies do
      resources :entries
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
