class AddCompanyToEntry < ActiveRecord::Migration[5.2]
  def change
    add_reference :entries, :company, foreign_key: true
  end
end
