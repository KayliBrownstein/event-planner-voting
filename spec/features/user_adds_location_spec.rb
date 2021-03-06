require 'spec_helper'

feature "User adds a location" do
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
  let(:location) do
    Location.create(
      user_id: 1,
      event_id: 1,
      name: 'Picco',
      description: 'Pizza place',
      street_address: '153 Tremont Street',
      city: 'Boston',
      state: 'MA'
    )
  end

  scenario "when user visits event page, user can add a location" do
    visit `/events/#{event.id}`

    expect(page).to have_content `#{location.name}`
    expect(page).to have_content `#{location.description}`
    expect(page).to have_content `#{location.street_address}`
    expect(page).to have_content `#{location.city}`
    expect(page).to have_content `#{location.state}`
  end
end
