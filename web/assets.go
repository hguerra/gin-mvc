package web

import (
	"fmt"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

var (
	assetsUrlPath  = "/assets"
	assetsFilePath = "web/assets"
	assets         = make(map[string]string)
)

// https://stackoverflow.com/questions/34558551/automatic-asset-revision-filenames-in-go-html-templates
func resolveName(asset string) (string, error) {
	p := fmt.Sprintf("%s/%s", assetsFilePath, asset)
	i := strings.LastIndex(p, ".")
	if i < 0 {
		i = len(p)
	}
	g := p[:i] + "-*" + p[i:]
	matches, err := filepath.Glob(g)
	if err != nil {
		return "", err
	}
	if len(matches) != 1 {
		return "", fmt.Errorf("%d matches for %s", len(matches), p)
	}
	return matches[0], nil
}

func manifest(assetName string) (string, error) {
	path, ok := assets[assetName]
	if ok {
		return path, nil
	}

	filepath, err := resolveName(assetName)
	if err != nil {
		return "", err
	}

	path = strings.Replace(filepath, assetsFilePath, assetsUrlPath, 1)
	assets[assetName] = path
	return path, nil
}

func loadAssets(r *gin.Engine) {
	r.Static(assetsUrlPath, assetsFilePath)
}
