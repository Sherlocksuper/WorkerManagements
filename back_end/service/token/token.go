package token

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"os"
)

type TokenStruct struct {
	Username string
	Password string
}

// GenerateToken 生成token
func GenerateToken(tokenStruct TokenStruct) string {

	claims := jwt.MapClaims{
		"name":     tokenStruct.Username,
		"password": tokenStruct.Password,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(os.Getenv("JWT_SECRET"))
	fmt.Println(tokenString, err)
	return tokenString
}

func ParsingToken(tokenString string) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method %v", token.Header["alg"])
		}
		return os.Getenv("JWT_SECRET"), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Println(claims["username"], claims["password"])
	} else {
		fmt.Println(err)
	}
}
