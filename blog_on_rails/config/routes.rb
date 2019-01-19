Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
 
  get('/', to: "posts#index")
  get('/posts/new', to: "posts#new")
  get('/posts/:id', to: "posts#show", as: :show_post)
  post('/posts', to: "posts#create")
  get('/posts/:id/edit', to: "posts#edit" , as: :post)
  patch('/posts/:id/edit', to: "posts#update")
  delete('/posts/:id', to: "posts#destroy")

  delete('/comments/:id', to: "comments#destroy")
  post('/comments/:id', to: "comments#create", as: :post_comments)

  get('/users/new', to: "users#new", as: :users)
  post('/users/new', to: "users#create")
  get('/users/:id/edit', to: "users#edit", as: :user) 
  get('/users/:id/edit/password', to: "users#edit_password")
  post('/users/:id/edit/password', to: "users#update_password")
  patch('/users/:id/edit', to: "users#update")

  get('/session/new', to: "sessions#new", as: :new_session)
  post('/session/new', to: "sessions#create")
  delete('/session', to: "sessions#destroy")

  # resources :posts
end
