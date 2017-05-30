class Api::V1::EventsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def current_user
    @current_user ||=
      if session[:user_id]
        User.find(session[:user_id])
      elsif Rails.env == 'test'
        User.first
      end
  end

  def index
  end 

  def new
    @event = Event.new
    render json: @event
  end

  def create
    @event = Event.create!(event_params)
    @event.user_id = current_user.id
    if @event.save!
      render json: @event
    else
      flash[:error] = "Error"
    end
  end

  def show
    @user = current_user
    @event = Event.find(params[:id])

      # Determine if the event has closed or not.
    if @event.cutoff_time.to_date >= Date.today
      @event_ended = false
    else
      @event_ended = true
      @location_winner = @event.winning_location
      @datetime_winner = @event.winning_datetime

      # If the winners do not exist, return an empty string.
      # This is an if..else in one line. If true, return the 1st, if false,
      # return the 2nd.

      @location_winner_name    = @location_winner ? @location_winner.name : ''
      @location_winner_address = @location_winner ? @location_winner.address_to_s : ''
      @datetime_winner_date    = @datetime_winner ? @datetime_winner.date : ''
      @datetime_winner_time    = @datetime_winner ? @datetime_winner.time : ''
    end

    @locations = @event.locations
    @datetimes = @event.datetimes

    # This is to display the invitees on the event show page.
    @invitee_emails = Invite.where(event_id: @event.id).pluck(:email).uniq.join(', ')

    render json: {
      event: @event,
      event_ended: @event_ended,
      datetime_winner_date: @datetime_winner_date,
      datetime_winner_time: @datetime_winner_time,
      location_winner_name: @location_winner_name,
      location_winner_address: @location_winner_address,
      invitee_emails: @invitee_emails
    }
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:name, :user_id, :cutoff_time, :description)
  end
end
