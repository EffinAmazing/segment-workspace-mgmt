module.exports = {
  models: [
    {
      name: "{brand_id} - Booking Created/Updated",
      description: "Booking Created/Updated",
      enabled: true,
      query: "select * from dbo.opera_booking_created_updated where brand_id = '{brand_id}'",
      queryIdentifierColumn: "id"
    },
    {
      name: "{brand_id} - B2C Entity Created/Updated",
      description: "B2C Entity Created/Updated",
      enabled: true,
      query: "select * from dbo.opera_entity_created_updated where brand_id = '{brand_id}' and entity_type = 'INDIVIDUAL'",
      queryIdentifierColumn: "id"
    },
    {
      name: "{brand_id} - B2B Entity Created/Updated",
      description: "B2B Entity Created/Updated",
      enabled: true,
      query: "select * from dbo.opera_entity_created_updated where brand_id = '{brand_id}' and entity_type != 'INDIVIDUAL'",
      queryIdentifierColumn: "id"
    },
    {
      name: "{brand_id} - Extra Created/Updated",
      description: "Extra Created/Updated",
      enabled: true,
      query: "select * from dbo.opera_extra_created_updated where brand_id = '{brand_id}'",
      queryIdentifierColumn: "id"
    }
  ]
}; 