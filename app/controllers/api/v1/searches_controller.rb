class Api::V1::SearchesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @current_user = current_user
    events_by_user = Event.where(user_id: @current_user.id)
    event_ids = Invite.where(email: @current_user.email).pluck(:event_id).uniq
    events_invited_to = Event.where(id: event_ids)

    if params[:query]
      query = params[:query]
      resultsOne = events_by_user.where("name ilike ?", "%#{query}%")
      resultsTwo = events_invited_to.where("name ilike ?", "%#{query}%")
      @search_results = resultsOne + resultsTwo

      render json: @search_results
    end
  end

  private

  def search_params
    params.permit(:query)
  end
end
