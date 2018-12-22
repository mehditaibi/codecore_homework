class CommentsController < ApplicationController

    before_action :authenticate_user!
    before_action :authorize_user!, only: [:destroy]
    
    def create

        @comment = Comment.create comment_params
        @post = Post.find params[:id]
        @comment.post = @post
        @comment.user = current_user

        if @comment.save
            flash[:success] = "Thanks for commenting!"
            redirect_to "/posts/#{@post.id}"
        else 
            @comments = @post.comments.order(created_at: :desc)
            render '/posts'
        end
    end

    def destroy
        @comment = Comment.find params[:id]
        @comment.destroy
        flash[:danger] = "Comment has been destroyed!"
        redirect_to show_post_path(@comment.post)
    end

    private
    def comment_params
        params.require(:comment).permit(:body)
    end

    def authorize_user!
        @comment = Comment.find params[:id]

        unless can?(:crud, @comment)
            flash[:danger] = "Access Denied"
            redirect_to show_post_path(@comment.post)
        end
    end

end
