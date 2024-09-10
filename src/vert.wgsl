struct Output {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn main(
  @builtin(vertex_index) VertexIndex : u32
) -> Output {
  var pos = array<vec2f, 4>(
    vec2(-0.5, -0.5),
    vec2(0.5, -0.5),
    vec2(-0.5, 0.5),
    vec2(0.5, 0.5),
  );
  
  var uv = array<vec2f, 4>(
    vec2(0., 0.),
    vec2(1., 0.),
    vec2(0, 1.),
    vec2(1., 1.),
  );

  var out: Output;
  out.pos = vec4f(pos[VertexIndex] * 1.5, 0.0, 1.0);
  out.uv = uv[VertexIndex];
  return out;
}
