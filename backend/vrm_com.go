
package main


import (
	"encoding/json"
	"fmt"
	"net/http"
)

// 自動生成
// ProtocolBufferとかで統一したい
type VRMAvatar struct {
	Name     string `json:"name"`
	Position struct {
		X float64 `json:"x"`
		Y float64 `json:"y"`
	} `json:"position"`
	Bones struct {
		LeftShoulder struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
			Z float64 `json:"z"`
		} `json:"LeftShoulder"`
		LeftUpperLeg struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
			Z float64 `json:"z"`
		} `json:"LeftUpperLeg"`
		Neck struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
			Z float64 `json:"z"`
		} `json:"Neck"`
		RightShoulder struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
			Z float64 `json:"z"`
		} `json:"RightShoulder"`
		RightUpperLeg struct {
			X float64 `json:"x"`
			Y float64 `json:"y"`
			Z float64 `json:"z"`
		} `json:"RightUpperLeg"`
	} `json:"bones"`
}

var avatars map[string]*VRMAvatar = map[string]*VRMAvatar{}

func syncAvatar(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "POST":
		d := json.NewDecoder(r.Body)
		p := &VRMAvatar{}
		err := d.Decode(p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		avatars[p.Name] = p
		j, _ := json.Marshal(avatars)
		w.Write(j)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "unsupported")
	}
}
