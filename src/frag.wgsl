@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let color_stops = array<vec3f, 2>(
    vec3f(0.8, 0.5, 0.8),
    vec3f(0.3, 0.5, 1.),
  );

  return vec4(mix(color_stops[0], color_stops[1], uv.x), 1.0);
}