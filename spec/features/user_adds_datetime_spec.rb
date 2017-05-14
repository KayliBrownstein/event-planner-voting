require 'spec_helper'

feature "User adds a datetime" do
  let(:datetime) do
    User.create(
      id: 1,
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
  end
  let(:event) do
    Event.create(
      id: 1,
      user_id: 1,
      name: "Birthday Party",
      description: 'This is a description. This is a description. This is a
        description. This is a description. This is a description. This is a
        description.',
      cutoff_time: "2017-05-29"
    )
  end
  let(:datetime) do
    Datetime.create(
      user_id: 1,
      event_id: 1,
      date: '2017-06-01',
      time: '19:00'
    )
  end

  scenario "when user visits event page, user can add a datetime" do
    visit `/events/#{event.id}`

    expect(page).to have_content `#{datetime.date}`
    expect(page).to have_content `#{datetime.time}`
  end
end
