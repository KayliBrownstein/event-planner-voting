require 'spec_helper'

feature "User edits their event" do
  let(:event) do
    User.create(
      id: 1,
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
    Event.create(
      id: 1,
      user_id: 1,
      name: "Birthday Party",
      description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
      cutoff_time: "2017-05-15"
    )
  end

  it "changes event's name" do
    event.name = "Dinner Party"
    expect(event.name).to eq("Dinner Party")
  end

  it "changes event's description" do
    event.description = "This is no longer the same description.This
    is no longer the same description.This is no longer the same description."
    expect(event.description).to eq("This is no longer the same description.This
    is no longer the same description.This is no longer the same description.")
  end

  it "changes event's cutoff_time" do
    event.cutoff_time = "2017-05-19"
    expect(event.cutoff_time).to eq("2017-05-19")
  end

end
