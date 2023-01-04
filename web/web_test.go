package web_test

import (
	"github.com/hguerra/gin-mvc/web"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"os"
)

var _ = Describe("Web", func() {
	Describe("func", func() {
		Context("with profile dev", func() {
			BeforeEach(func() {
				err := os.Setenv("PROFILE", "dev")
				if err != nil {
					Fail("Error to set PROFILE")
				}
			})
			AfterEach(func() {
				err := os.Setenv("PROFILE", "")
				if err != nil {
					Fail("Error to set PROFILE")
				}
			})

			It("should return true", func() {
				Expect(web.IsDev()).To(BeTrue())
			})
		})

		Context("with no profile", func() {
			It("should return false", func() {
				Expect(web.IsDev()).To(BeFalse())
			})
		})
	})
})
