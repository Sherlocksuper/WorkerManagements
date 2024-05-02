package modal

type User struct {
	Username string `json:"username" gorm:"primaryKey"`
	Password string `json:"password"`
}
