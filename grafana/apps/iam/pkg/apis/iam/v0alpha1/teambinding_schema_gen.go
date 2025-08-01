//
// Code generated by grafana-app-sdk. DO NOT EDIT.
//

package v0alpha1

import (
	"github.com/grafana/grafana-app-sdk/resource"
)

// schema is unexported to prevent accidental overwrites
var (
	schemaTeamBinding = resource.NewSimpleSchema("iam.grafana.app", "v0alpha1", &TeamBinding{}, &TeamBindingList{}, resource.WithKind("TeamBinding"),
		resource.WithPlural("teambindings"), resource.WithScope(resource.NamespacedScope))
	kindTeamBinding = resource.Kind{
		Schema: schemaTeamBinding,
		Codecs: map[resource.KindEncoding]resource.Codec{
			resource.KindEncodingJSON: &TeamBindingJSONCodec{},
		},
	}
)

// Kind returns a resource.Kind for this Schema with a JSON codec
func TeamBindingKind() resource.Kind {
	return kindTeamBinding
}

// Schema returns a resource.SimpleSchema representation of TeamBinding
func TeamBindingSchema() *resource.SimpleSchema {
	return schemaTeamBinding
}

// Interface compliance checks
var _ resource.Schema = kindTeamBinding
