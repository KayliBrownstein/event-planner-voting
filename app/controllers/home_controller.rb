class HomeController < ApplicationController
  def show
    @token = params[:invite_token]
    session[:token] = @toke
  end
end
