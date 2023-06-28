package application_test

import (
	"testing"

	"github.com/google/uuid"
	"github.com/leandrobraga/curso-fullcycle/arquitetura-hexagonal/application"
	"github.com/stretchr/testify/require"
)

func TestProduct_Enable(t *testing.T) {
	product := application.Product{Name: "Hello", Status: application.DISABLED, Price: 10}

	err := product.Enable()
	require.Nil(t, err)

	product.Price = 0

	err = product.Enable()
	require.Equal(t, "the price must be greater than zero to enable the product", err.Error())
}

func TestProduct_Disable(t *testing.T) {
	product := application.Product{Name: "Hello", Status: application.DISABLED, Price: 10}

	err := product.Disable()
	require.Equal(t, "the price must be zero to disable the product", err.Error())

	product.Price = 0

	err = product.Disable()
	require.Nil(t, err)
}

func TestProduct_IsValid(t *testing.T) {
	product := application.Product{ID: uuid.NewString(), Name: "Hello", Status: application.DISABLED, Price: 10}

	valid, err := product.IsValid()
	require.Nil(t, err)
	require.Equal(t, true, valid)

	product.Status = "INVALID"
	valid, err = product.IsValid()
	require.Equal(t, false, valid)
	require.Equal(t, "the status must be enabled or disabled", err.Error())

	product.Status = application.ENABLED
	product.Price = -10
	valid, err = product.IsValid()
	require.Equal(t, false, valid)
	require.Equal(t, "the price must be greater or equal zero", err.Error())
}
