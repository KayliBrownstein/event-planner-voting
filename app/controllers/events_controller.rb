class EventsController < ApplicationController
    # def index
    #   @event_members = EventMember.where(user_id: current_user.id)
    #   unless @event_members.nil?
    #     @events = []
    #     @event_members.each do |event_member|
    #       @events << Event.find(event_member.event_id)
    #     end
    #   end
    # end


  def show
    @location = Location.new
    @datetime = Datetime.new
    @event = Event.find(params[:id])
    session[:ugid] = @event.id
    # belongs_to_event?(@event.id)
  end


  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      session[:ugid] = @event.id
      redirect_to '/event_members/create'
      flash[:notice] = "Event added successfully"
    else
      flash[:notice] = @event.errors.full_messages.join(", ")
      render :new
    end
  end

  def edit
    @event = Event.find(params[:id])
    session[:ugid] = @event.id
    @invite = Invite.new
  end

  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to event_path(@event)
  end

   private

 def event_params
   params.permit(:name, :user_id, :description, :cutoff_time, :suggested_date, :suggested_location, :suggested_time)
 end

 # def belongs_to_event?(event_id)
 #   @event_member = EventMember.find_by(user_id: current_user.id, event_id: event_id)
 #   if @event_member.nil?
 #     redirect_to events_path
 #     flash[:notice] = "You Do Not Belong to That Event"
 #   end
 # end
end
