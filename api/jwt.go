package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var expTime = time.Now().Add(24 * time.Hour)

type MyCustomClaims struct {
	Id int32
	jwt.RegisteredClaims
}

func createToken(id int32) (string, error) {
	claims := MyCustomClaims{
		id,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenStr, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}

	return tokenStr, err
}

func VerifyJWT(tokenString string) (*jwt.Token, error) {
	secret := os.Getenv("JWT_SECRET")

	return jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(secret), nil
	})
}

func GetUserIdFromToken(r *http.Request) (int, error) {
	authToken, err := r.Cookie("accessToken")
	if err != nil {
		return 0, fmt.Errorf("token problem")
	}

	token, err := VerifyJWT(authToken.Value)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	claims := token.Claims.(jwt.MapClaims)

	userIdStr := claims["Id"].(float64)
	userId := int(userIdStr)

	return userId, nil
}
