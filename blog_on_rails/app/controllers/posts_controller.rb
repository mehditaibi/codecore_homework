class PostsController < ApplicationController

    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize_user!, only: [:edit, :update, :destroy]

    def index
        @posts = Post.all.order(created_at: :desc)
    end

    def show
        @comment = Comment.new
        @post = Post.find params[:id]
        @comments = @post.comments.order(created_at: :desc)
    end

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
        @post.user = current_user

        if @post.save
            flash[:success] = "Your post is now live! 👍🏻"
            redirect_to "/posts/#{@post.id}"
        else
            flash[:danger] = "The body of your post is too short.. Minimum 50 characters to submit.. Thank you "
            render :new 
        end
    end

    def edit
        @post = Post.find params[:id]
    end

    def update 
        @post = Post.find params[:id]

        if @post.update post_params
            flash[:success] = "Your post has been updated! 👍🏻"
            redirect_to "/posts/#{@post.id}"
        else
            render :edit
        end
    end

    def destroy
        @post = Post.find params[:id]
        @post.destroy
        flash[:danger] = "Your post has been destroyed! 👍🏻"
        redirect_to '/'
    end

    private

    def post_params
        params.require(:post).permit(:title, :body)
    end

    def authorize_user!
        @post = Post.find params[:id]

        unless can?(:crud, @post)
            flash[:danger] = "Access Denied"
            redirect_to show_post_path(@post)
        end
    end

end
