
  const createEmptyBuf = (device, size) => {
      return device.createBuffer({size, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST });
  };
  const createUniformBuf = (device, size) => {
    return device.createBuffer({size, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST})
  }

  const createWeightBuf = (device, size, data) => {
    const buf = device.createBuffer({ mappedAtCreation: true, size, usage: GPUBufferUsage.STORAGE });
    new Uint8Array(buf.getMappedRange()).set(data);
    buf.unmap();
    return buf;
  };

  const addComputePass = (device, commandEncoder, pipeline, bufs, workgroup) => {
    const bindGroup = device.createBindGroup({layout: pipeline.getBindGroupLayout(0), entries: bufs.map((buffer, index) => ({ binding: index, resource: { buffer } }))});
    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(...workgroup);
    passEncoder.end();
  };
    var transformer = function() {

    const r_64_16_8_16_501_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<i32>;
@group(0) @binding(2)var<storage,read_write>data2:array<i32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16 */
  var gidx1 = i32(gindex.y); /* 64 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var val0 = data2[0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var val1 = data1[((gidx0*8016)+(lidx1*501)+ridx0)];
    var alu0 = ((gidx0*16416768)+(gidx1<<5)+(lidx0<<2)+(lidx1*1026048)+(ridx0<<11));
    var val2 = data3[alu0];
    var val3 = data3[(alu0+1)];
    var val4 = data3[(alu0+2)];
    var val5 = data3[(alu0+3)];
    var cast0 = (f32(((val1!=val0)!=true)));
    acc0 = (acc0+(cast0*val2));
    acc1 = (acc1+(cast0*val3));
    acc2 = (acc2+(cast0*val4));
    acc3 = (acc3+(cast0*val5));
  }
  var alu6 = (lidx1+(gidx0<<4)+(gidx1<<13)+(lidx0<<10));
  data0[alu6] = acc0;
  data0[(alu6+256)] = acc1;
  data0[(alu6+512)] = acc2;
  data0[(alu6+768)] = acc3;
}`;

const r_2048_16_16 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 16; ridx0++) {
    var val0 = data1[((gidx0<<8)+(lidx0<<4)+ridx0)];
    acc0 = (acc0+val0);
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val1 = temp0[ridx1];
      acc1 = (acc1+val1);
    }
    data0[gidx0] = acc1;
  }
}`;

const r_256_8 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 256>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(256) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 256 */
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 8; ridx0++) {
    var val0 = data1[((lidx0<<3)+ridx0)];
    acc0 = (acc0+(val0*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 256; ridx1++) {
      var val1 = temp0[ridx1];
      acc1 = (acc1+val1);
    }
    data0[0] = sqrt((1/((acc1*0.00048828125f)+1e-05f)));
  }
}`;

const E_16_32_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16 */
  var lidx0 = i32(lindex.x); /* 32 */
  var val0 = data2[0];
  var alu0 = ((gidx0<<7)+(lidx0<<2));
  var val1 = data1[alu0];
  var val2 = data3[alu0];
  var alu1 = (alu0+1);
  var val3 = data1[alu1];
  var val4 = data3[alu1];
  var alu2 = (alu0+2);
  var val5 = data1[alu2];
  var val6 = data3[alu2];
  var alu3 = (alu0+3);
  var val7 = data1[alu3];
  var val8 = data3[alu3];
  data0[alu1] = (val4*val0*val3);
  data0[alu2] = (val6*val0*val5);
  data0[alu3] = (val8*val0*val7);
  data0[alu0] = (val2*val0*val1);
}`;

const r_512_16_128n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 512 */
  var lidx0 = i32(lindex.x); /* 16 */
  var alu0 = (lidx0<<7);
  var val0 = data3[gidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var alu1 = ((gidx0<<11)+alu0+ridx0);
    var val1 = data1[(alu0+ridx0)];
    var val2 = atomicLoad(&data2[(alu1>>2)]);
    var alu2 = ((val2>>(((u32(alu1))&3u)<<3u))&255u);
    var precast0 = alu2;
    var precast1 = (select(0u,4294967040u,(0u<(alu2>>7u)))|bitcast<u32>(precast0));
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast1)))))*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val3 = temp0[ridx1];
      acc1 = (acc1+val3);
    }
    data0[gidx0] = acc1;
  }
}`;

const E_4_8_16_2n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (gidx0<<4);
  var alu1 = (lidx0<<6);
  var alu2 = (alu0+alu1);
  var val0 = data3[(lidx1+alu2)];
  var alu3 = ((lidx1>>1)<<1);
  var alu4 = (alu2+alu3);
  var alu5 = (alu0+alu3+(start_pos<<6));
  var alu6 = ((lidx1&1)<1);
  var val1 = select(0.0f, data2[alu5], alu6);
  var val2 = select(0.0f, data1[(alu4+1)], alu6);
  var val3 = select(0.0f, data1[alu4], alu6);
  var val4 = select(0.0f, data2[(alu5+1)], alu6);
  var alu7 = (alu6!=true);
  var val5 = select(0.0f, data2[(alu5+1)], alu7);
  var val6 = select(0.0f, data1[(alu4+1)], alu7);
  var val7 = select(0.0f, data1[alu4], alu7);
  var val8 = select(0.0f, data2[alu5], alu7);
  var alu8 = (lidx1+(start_pos<<9)+alu0+alu1);
  data0[(alu8+524288)] = val0;
  data0[alu8] = ((val6*val8)+(val7*val5)+(val3*val1)+(val2*val4*select(0.0f,-1.0f,alu6)));
}`;

const r_2048_16_128n2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var alu0 = (lidx0<<7);
  var val0 = data3[gidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var alu1 = ((gidx0<<11)+alu0+ridx0);
    var val1 = data1[(alu0+ridx0)];
    var val2 = atomicLoad(&data2[(alu1>>2)]);
    var alu2 = ((val2>>(((u32(alu1))&3u)<<3u))&255u);
    var precast0 = alu2;
    var precast1 = (select(0u,4294967040u,(0u<(alu2>>7u)))|bitcast<u32>(precast0));
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast1)))))*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val3 = temp0[ridx1];
      acc1 = (acc1+val3);
    }
    data0[gidx0] = acc1;
  }
}`;

const E_2_8_16_2_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (gidx0<<5);
  var alu1 = (lidx1<<1);
  var alu2 = ((start_pos<<6)+alu0+alu1);
  var val0 = data2[alu2];
  var val1 = data2[(alu2+1)];
  var alu3 = (alu0+(lidx0<<8)+alu1);
  var val2 = data1[alu3];
  var alu4 = (alu3+1);
  var val3 = data1[alu4];
  var alu5 = (alu3+64);
  var val4 = data1[alu5];
  var alu6 = (alu3+65);
  var val5 = data1[alu6];
  var alu7 = (alu3+128);
  var val6 = data1[alu7];
  var alu8 = (alu3+129);
  var val7 = data1[alu8];
  var alu9 = (alu3+192);
  var val8 = data1[alu9];
  var alu10 = (alu3+193);
  var val9 = data1[alu10];
  data0[alu4] = ((val1*val2)+(val0*val3));
  data0[alu6] = ((val1*val4)+(val0*val5));
  data0[alu8] = ((val1*val6)+(val0*val7));
  data0[alu10] = ((val1*val8)+(val0*val9));
  data0[alu5] = ((val0*val4)-(val1*val5));
  data0[alu7] = ((val0*val6)-(val1*val7));
  data0[alu9] = ((val0*val8)-(val1*val9));
  data0[alu3] = ((val0*val2)-(val1*val3));
}`;

const r_2_28start_pos2B129_4_8_8_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 128>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(4,8) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* UOp(Ops.ADD, dtypes.int, arg=None, src=(
  UOp(Ops.DEFINE_VAR, dtypes.int, arg=('start_pos', 0, 1024), src=()),
  UOp(Ops.CONST, dtypes.int, arg=1, src=()),)) */
  var gidx1 = i32(gindex.y); /* 2 */
  var lidx0 = i32(lindex.x); /* 4 */
  var lidx1 = i32(lindex.y); /* 8 */
  var alu0 = (start_pos<<3);
  var alu1 = (lidx0<<5);
  var alu2 = (gidx0+(gidx1*((start_pos<<4)+16))+(lidx0*(start_pos+1)));
  var alu3 = (alu0+8);
  var alu4 = ((gidx0<<3)+(gidx1<<2));
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 8; ridx0++) {
    var alu5 = (ridx0<<3);
    var alu6 = (lidx1+alu5);
    var alu7 = (lidx1+(gidx1<<10)+(lidx0<<6)+alu5);
    var val0 = data1[alu7];
    var val1 = data2[(alu6+(((alu4+1)%alu3)<<6))];
    var val2 = data2[(alu6+(((alu4+2)%alu3)<<6))];
    var val3 = data2[(alu6+(((alu4+3)%alu3)<<6))];
    var val4 = data2[(alu6+((alu4%alu3)<<6))];
    var val5 = data1[(alu7+256)];
    var val6 = data1[(alu7+512)];
    var val7 = data1[(alu7+768)];
    acc0 = (acc0+(val0*val4));
    acc1 = (acc1+(val5*val1));
    acc2 = (acc2+(val6*val2));
    acc3 = (acc3+(val7*val3));
  }
  var alu13 = (alu1+(lidx1<<2));
  temp0[alu13] = acc0;
  temp0[(alu13+1)] = acc1;
  temp0[(alu13+2)] = acc2;
  temp0[(alu13+3)] = acc3;
  workgroupBarrier();
  if (((bool(lidx1))!=true)) {
    var acc4 = 0.0f;
    var acc5 = 0.0f;
    var acc6 = 0.0f;
    var acc7 = 0.0f;
    for (var ridx1 = 0; ridx1 < 8; ridx1++) {
      var alu20 = (alu1+(ridx1<<2));
      var val8 = temp0[(alu20+1)];
      var val9 = temp0[(alu20+2)];
      var val10 = temp0[(alu20+3)];
      var val11 = temp0[alu20];
      acc4 = (acc4+val11);
      acc5 = (acc5+val8);
      acc6 = (acc6+val9);
      acc7 = (acc7+val10);
    }
    data0[alu2] = (acc4*0.125f);
    data0[(alu2+(start_pos<<2)+4)] = (acc5*0.125f);
    data0[(alu2+alu0+8)] = (acc6*0.125f);
    data0[(alu2+(start_pos*12)+12)] = (acc7*0.125f);
  }
}`;

const r_32_28start_pos2B129 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<uniform>start_pos:i32;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (start_pos+1);
  var acc0 = (f32(-inf(1.0)));
  for (var ridx0 = 0; ridx0 < alu0; ridx0++) {
    var val0 = data1[((lidx0*alu0)+ridx0)];
    acc0 = select(acc0,val0,(acc0<val0));
  }
  data0[lidx0] = acc0;
}`;

const r_32_28start_pos2B129n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (start_pos+1);
  var val0 = data2[lidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < alu0; ridx0++) {
    var val1 = data1[((lidx0*alu0)+ridx0)];
    acc0 = (acc0+exp2(((val1-val0)*1.4426950408889634f)));
  }
  data0[lidx0] = acc0;
}`;

const E_28start_pos2B129_8_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(8) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* UOp(Ops.ADD, dtypes.int, arg=None, src=(
  UOp(Ops.DEFINE_VAR, dtypes.int, arg=('start_pos', 0, 1024), src=()),
  UOp(Ops.CONST, dtypes.int, arg=1, src=()),)) */
  var lidx0 = i32(lindex.x); /* 8 */
  var alu0 = (gidx0+(lidx0*((start_pos<<2)+4)));
  var val0 = data1[alu0];
  var alu1 = (start_pos+alu0+1);
  var val1 = data1[alu1];
  var alu2 = (alu0+(start_pos*3)+3);
  var val2 = data1[alu2];
  var alu3 = (alu0+(start_pos<<1)+2);
  var val3 = data1[alu3];
  var alu4 = (lidx0<<2);
  var val4 = data2[alu4];
  var val5 = data3[alu4];
  var alu5 = (alu4+1);
  var val6 = data2[alu5];
  var val7 = data3[alu5];
  var alu6 = (alu4+2);
  var val8 = data2[alu6];
  var val9 = data3[alu6];
  var alu7 = (alu4+3);
  var val10 = data2[alu7];
  var val11 = data3[alu7];
  data0[alu0] = (exp2(((val0-val4)*1.4426950408889634f))*(1/val5));
  data0[alu1] = (exp2(((val1-val6)*1.4426950408889634f))*(1/val7));
  data0[alu2] = (exp2(((val2-val10)*1.4426950408889634f))*(1/val11));
  data0[alu3] = (exp2(((val3-val8)*1.4426950408889634f))*(1/val9));
}`;

const r_4_8_16_28start_pos2B129_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 4 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (lidx1<<2);
  var alu1 = ((start_pos<<3)+8);
  var alu2 = (start_pos+1);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < alu2; ridx0++) {
    var val0 = data1[((gidx0*alu1)+(lidx0*alu2)+ridx0)];
    var alu3 = (alu0+((((gidx0<<1)+(ridx0<<3)+(lidx0>>2))%alu1)<<6));
    var val1 = data2[(alu3+524288)];
    var val2 = data2[(alu3+524289)];
    var val3 = data2[(alu3+524290)];
    var val4 = data2[(alu3+524291)];
    acc0 = (acc0+(val0*val1));
    acc1 = (acc1+(val0*val2));
    acc2 = (acc2+(val0*val3));
    acc3 = (acc3+(val0*val4));
  }
  var alu9 = ((gidx0<<9)+(lidx0<<6)+alu0);
  data0[alu9] = acc0;
  data0[(alu9+1)] = acc1;
  data0[(alu9+2)] = acc2;
  data0[(alu9+3)] = acc3;
}`;

const r_2048_16_128n3 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var val0 = data1[gidx0];
  var alu0 = (lidx0<<7);
  var val1 = data4[gidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var alu1 = ((gidx0<<11)+alu0+ridx0);
    var val2 = data2[(alu0+ridx0)];
    var val3 = atomicLoad(&data3[(alu1>>2)]);
    var alu2 = ((val3>>(((u32(alu1))&3u)<<3u))&255u);
    var precast0 = alu2;
    var precast1 = (select(0u,4294967040u,(0u<(alu2>>7u)))|bitcast<u32>(precast0));
    acc0 = (acc0+(val2*(f32((i32(bitcast<i32>(precast1)))))*val1));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val4 = temp0[ridx1];
      acc1 = (acc1+val4);
    }
    data0[gidx0] = (val0+acc1);
  }
}`;

const r_64_32_512_4_4n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = ((gidx0<<7)+(lidx0<<2));
  var alu1 = (alu0+1);
  var alu2 = (alu0+2);
  var alu3 = (alu0+3);
  var val0 = data3[alu1];
  var val1 = data3[alu2];
  var val2 = data3[alu3];
  var val3 = data3[alu0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 512; ridx0++) {
    var alu4 = (ridx0<<2);
    var val4 = data1[alu4];
    var alu5 = ((gidx0<<18)+(lidx0<<13)+alu4);
    var alu6 = (alu5+1);
    var alu7 = (alu5+2);
    var alu8 = (alu5+3);
    var alu9 = (alu5+2048);
    var alu10 = (alu5+2049);
    var alu11 = (alu5+2050);
    var alu12 = (alu5+2051);
    var alu13 = (alu5+4096);
    var alu14 = (alu5+4097);
    var alu15 = (alu5+4098);
    var alu16 = (alu5+4099);
    var alu17 = (alu5+6144);
    var alu18 = (alu5+6145);
    var alu19 = (alu5+6146);
    var alu20 = (alu5+6147);
    var val5 = data1[(alu4+1)];
    var val6 = data1[(alu4+2)];
    var val7 = data1[(alu4+3)];
    var val8 = atomicLoad(&data2[(alu6>>2)]);
    var val9 = atomicLoad(&data2[(alu7>>2)]);
    var val10 = atomicLoad(&data2[(alu8>>2)]);
    var val11 = atomicLoad(&data2[(alu9>>2)]);
    var val12 = atomicLoad(&data2[(alu10>>2)]);
    var val13 = atomicLoad(&data2[(alu11>>2)]);
    var val14 = atomicLoad(&data2[(alu12>>2)]);
    var val15 = atomicLoad(&data2[(alu13>>2)]);
    var val16 = atomicLoad(&data2[(alu14>>2)]);
    var val17 = atomicLoad(&data2[(alu15>>2)]);
    var val18 = atomicLoad(&data2[(alu16>>2)]);
    var val19 = atomicLoad(&data2[(alu17>>2)]);
    var val20 = atomicLoad(&data2[(alu18>>2)]);
    var val21 = atomicLoad(&data2[(alu19>>2)]);
    var val22 = atomicLoad(&data2[(alu20>>2)]);
    var val23 = atomicLoad(&data2[(alu5>>2)]);
    var alu21 = ((val8>>(((u32(alu6))&3u)<<3u))&255u);
    var precast0 = alu21;
    var alu22 = ((val9>>(((u32(alu7))&3u)<<3u))&255u);
    var precast1 = alu22;
    var alu23 = ((val10>>(((u32(alu8))&3u)<<3u))&255u);
    var precast2 = alu23;
    var alu24 = ((val11>>(((u32(alu9))&3u)<<3u))&255u);
    var precast3 = alu24;
    var alu25 = ((val12>>(((u32(alu10))&3u)<<3u))&255u);
    var precast4 = alu25;
    var alu26 = ((val13>>(((u32(alu11))&3u)<<3u))&255u);
    var precast5 = alu26;
    var alu27 = ((val14>>(((u32(alu12))&3u)<<3u))&255u);
    var precast6 = alu27;
    var alu28 = ((val15>>(((u32(alu13))&3u)<<3u))&255u);
    var precast7 = alu28;
    var alu29 = ((val16>>(((u32(alu14))&3u)<<3u))&255u);
    var precast8 = alu29;
    var alu30 = ((val17>>(((u32(alu15))&3u)<<3u))&255u);
    var precast9 = alu30;
    var alu31 = ((val18>>(((u32(alu16))&3u)<<3u))&255u);
    var precast10 = alu31;
    var alu32 = ((val19>>(((u32(alu17))&3u)<<3u))&255u);
    var precast11 = alu32;
    var alu33 = ((val20>>(((u32(alu18))&3u)<<3u))&255u);
    var precast12 = alu33;
    var alu34 = ((val21>>(((u32(alu19))&3u)<<3u))&255u);
    var precast13 = alu34;
    var alu35 = ((val22>>(((u32(alu20))&3u)<<3u))&255u);
    var precast14 = alu35;
    var alu36 = ((val23>>(((u32(alu5))&3u)<<3u))&255u);
    var precast15 = alu36;
    var precast16 = (select(0u,4294967040u,(0u<(alu21>>7u)))|bitcast<u32>(precast0));
    var precast17 = (select(0u,4294967040u,(0u<(alu22>>7u)))|bitcast<u32>(precast1));
    var precast18 = (select(0u,4294967040u,(0u<(alu23>>7u)))|bitcast<u32>(precast2));
    var precast19 = (select(0u,4294967040u,(0u<(alu24>>7u)))|bitcast<u32>(precast3));
    var precast20 = (select(0u,4294967040u,(0u<(alu25>>7u)))|bitcast<u32>(precast4));
    var precast21 = (select(0u,4294967040u,(0u<(alu26>>7u)))|bitcast<u32>(precast5));
    var precast22 = (select(0u,4294967040u,(0u<(alu27>>7u)))|bitcast<u32>(precast6));
    var precast23 = (select(0u,4294967040u,(0u<(alu28>>7u)))|bitcast<u32>(precast7));
    var precast24 = (select(0u,4294967040u,(0u<(alu29>>7u)))|bitcast<u32>(precast8));
    var precast25 = (select(0u,4294967040u,(0u<(alu30>>7u)))|bitcast<u32>(precast9));
    var precast26 = (select(0u,4294967040u,(0u<(alu31>>7u)))|bitcast<u32>(precast10));
    var precast27 = (select(0u,4294967040u,(0u<(alu32>>7u)))|bitcast<u32>(precast11));
    var precast28 = (select(0u,4294967040u,(0u<(alu33>>7u)))|bitcast<u32>(precast12));
    var precast29 = (select(0u,4294967040u,(0u<(alu34>>7u)))|bitcast<u32>(precast13));
    var precast30 = (select(0u,4294967040u,(0u<(alu35>>7u)))|bitcast<u32>(precast14));
    var precast31 = (select(0u,4294967040u,(0u<(alu36>>7u)))|bitcast<u32>(precast15));
    acc0 = (acc0+(val5*(f32((i32(bitcast<i32>(precast16)))))*val3)+(val4*(f32((i32(bitcast<i32>(precast31)))))*val3)+(val6*(f32((i32(bitcast<i32>(precast17)))))*val3)+(val7*(f32((i32(bitcast<i32>(precast18)))))*val3));
    acc1 = (acc1+(val5*(f32((i32(bitcast<i32>(precast20)))))*val0)+(val4*(f32((i32(bitcast<i32>(precast19)))))*val0)+(val6*(f32((i32(bitcast<i32>(precast21)))))*val0)+(val7*(f32((i32(bitcast<i32>(precast22)))))*val0));
    acc2 = (acc2+(val5*(f32((i32(bitcast<i32>(precast24)))))*val1)+(val4*(f32((i32(bitcast<i32>(precast23)))))*val1)+(val6*(f32((i32(bitcast<i32>(precast25)))))*val1)+(val7*(f32((i32(bitcast<i32>(precast26)))))*val1));
    acc3 = (acc3+(val5*(f32((i32(bitcast<i32>(precast28)))))*val2)+(val4*(f32((i32(bitcast<i32>(precast27)))))*val2)+(val6*(f32((i32(bitcast<i32>(precast29)))))*val2)+(val7*(f32((i32(bitcast<i32>(precast30)))))*val2));
  }
  data0[alu1] = acc1;
  data0[alu2] = acc2;
  data0[alu3] = acc3;
  data0[alu0] = acc0;
}`;

const r_64_32_512_4_4n2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = ((gidx0<<7)+(lidx0<<2));
  var alu1 = (alu0+1);
  var alu2 = (alu0+2);
  var alu3 = (alu0+3);
  var val0 = data3[alu1];
  var val1 = data3[alu2];
  var val2 = data3[alu3];
  var val3 = data3[alu0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 512; ridx0++) {
    var alu4 = (ridx0<<2);
    var val4 = data1[alu4];
    var alu5 = ((gidx0<<18)+(lidx0<<13)+alu4);
    var alu6 = (alu5+1);
    var alu7 = (alu5+2);
    var alu8 = (alu5+3);
    var alu9 = (alu5+2048);
    var alu10 = (alu5+2049);
    var alu11 = (alu5+2050);
    var alu12 = (alu5+2051);
    var alu13 = (alu5+4096);
    var alu14 = (alu5+4097);
    var alu15 = (alu5+4098);
    var alu16 = (alu5+4099);
    var alu17 = (alu5+6144);
    var alu18 = (alu5+6145);
    var alu19 = (alu5+6146);
    var alu20 = (alu5+6147);
    var val5 = data1[(alu4+1)];
    var val6 = data1[(alu4+2)];
    var val7 = data1[(alu4+3)];
    var val8 = atomicLoad(&data2[(alu6>>2)]);
    var val9 = atomicLoad(&data2[(alu7>>2)]);
    var val10 = atomicLoad(&data2[(alu8>>2)]);
    var val11 = atomicLoad(&data2[(alu9>>2)]);
    var val12 = atomicLoad(&data2[(alu10>>2)]);
    var val13 = atomicLoad(&data2[(alu11>>2)]);
    var val14 = atomicLoad(&data2[(alu12>>2)]);
    var val15 = atomicLoad(&data2[(alu13>>2)]);
    var val16 = atomicLoad(&data2[(alu14>>2)]);
    var val17 = atomicLoad(&data2[(alu15>>2)]);
    var val18 = atomicLoad(&data2[(alu16>>2)]);
    var val19 = atomicLoad(&data2[(alu17>>2)]);
    var val20 = atomicLoad(&data2[(alu18>>2)]);
    var val21 = atomicLoad(&data2[(alu19>>2)]);
    var val22 = atomicLoad(&data2[(alu20>>2)]);
    var val23 = atomicLoad(&data2[(alu5>>2)]);
    var alu21 = ((val8>>(((u32(alu6))&3u)<<3u))&255u);
    var precast0 = alu21;
    var alu22 = ((val9>>(((u32(alu7))&3u)<<3u))&255u);
    var precast1 = alu22;
    var alu23 = ((val10>>(((u32(alu8))&3u)<<3u))&255u);
    var precast2 = alu23;
    var alu24 = ((val11>>(((u32(alu9))&3u)<<3u))&255u);
    var precast3 = alu24;
    var alu25 = ((val12>>(((u32(alu10))&3u)<<3u))&255u);
    var precast4 = alu25;
    var alu26 = ((val13>>(((u32(alu11))&3u)<<3u))&255u);
    var precast5 = alu26;
    var alu27 = ((val14>>(((u32(alu12))&3u)<<3u))&255u);
    var precast6 = alu27;
    var alu28 = ((val15>>(((u32(alu13))&3u)<<3u))&255u);
    var precast7 = alu28;
    var alu29 = ((val16>>(((u32(alu14))&3u)<<3u))&255u);
    var precast8 = alu29;
    var alu30 = ((val17>>(((u32(alu15))&3u)<<3u))&255u);
    var precast9 = alu30;
    var alu31 = ((val18>>(((u32(alu16))&3u)<<3u))&255u);
    var precast10 = alu31;
    var alu32 = ((val19>>(((u32(alu17))&3u)<<3u))&255u);
    var precast11 = alu32;
    var alu33 = ((val20>>(((u32(alu18))&3u)<<3u))&255u);
    var precast12 = alu33;
    var alu34 = ((val21>>(((u32(alu19))&3u)<<3u))&255u);
    var precast13 = alu34;
    var alu35 = ((val22>>(((u32(alu20))&3u)<<3u))&255u);
    var precast14 = alu35;
    var alu36 = ((val23>>(((u32(alu5))&3u)<<3u))&255u);
    var precast15 = alu36;
    var precast16 = (select(0u,4294967040u,(0u<(alu21>>7u)))|bitcast<u32>(precast0));
    var precast17 = (select(0u,4294967040u,(0u<(alu22>>7u)))|bitcast<u32>(precast1));
    var precast18 = (select(0u,4294967040u,(0u<(alu23>>7u)))|bitcast<u32>(precast2));
    var precast19 = (select(0u,4294967040u,(0u<(alu24>>7u)))|bitcast<u32>(precast3));
    var precast20 = (select(0u,4294967040u,(0u<(alu25>>7u)))|bitcast<u32>(precast4));
    var precast21 = (select(0u,4294967040u,(0u<(alu26>>7u)))|bitcast<u32>(precast5));
    var precast22 = (select(0u,4294967040u,(0u<(alu27>>7u)))|bitcast<u32>(precast6));
    var precast23 = (select(0u,4294967040u,(0u<(alu28>>7u)))|bitcast<u32>(precast7));
    var precast24 = (select(0u,4294967040u,(0u<(alu29>>7u)))|bitcast<u32>(precast8));
    var precast25 = (select(0u,4294967040u,(0u<(alu30>>7u)))|bitcast<u32>(precast9));
    var precast26 = (select(0u,4294967040u,(0u<(alu31>>7u)))|bitcast<u32>(precast10));
    var precast27 = (select(0u,4294967040u,(0u<(alu32>>7u)))|bitcast<u32>(precast11));
    var precast28 = (select(0u,4294967040u,(0u<(alu33>>7u)))|bitcast<u32>(precast12));
    var precast29 = (select(0u,4294967040u,(0u<(alu34>>7u)))|bitcast<u32>(precast13));
    var precast30 = (select(0u,4294967040u,(0u<(alu35>>7u)))|bitcast<u32>(precast14));
    var precast31 = (select(0u,4294967040u,(0u<(alu36>>7u)))|bitcast<u32>(precast15));
    acc0 = (acc0+(val5*(f32((i32(bitcast<i32>(precast16)))))*val3)+(val4*(f32((i32(bitcast<i32>(precast31)))))*val3)+(val6*(f32((i32(bitcast<i32>(precast17)))))*val3)+(val7*(f32((i32(bitcast<i32>(precast18)))))*val3));
    acc1 = (acc1+(val5*(f32((i32(bitcast<i32>(precast20)))))*val0)+(val4*(f32((i32(bitcast<i32>(precast19)))))*val0)+(val6*(f32((i32(bitcast<i32>(precast21)))))*val0)+(val7*(f32((i32(bitcast<i32>(precast22)))))*val0));
    acc2 = (acc2+(val5*(f32((i32(bitcast<i32>(precast24)))))*val1)+(val4*(f32((i32(bitcast<i32>(precast23)))))*val1)+(val6*(f32((i32(bitcast<i32>(precast25)))))*val1)+(val7*(f32((i32(bitcast<i32>(precast26)))))*val1));
    acc3 = (acc3+(val5*(f32((i32(bitcast<i32>(precast28)))))*val2)+(val4*(f32((i32(bitcast<i32>(precast27)))))*val2)+(val6*(f32((i32(bitcast<i32>(precast29)))))*val2)+(val7*(f32((i32(bitcast<i32>(precast30)))))*val2));
  }
  var val24 = data4[alu1];
  var val25 = data4[alu2];
  var val26 = data4[alu3];
  var val27 = data4[alu0];
  data0[alu0] = (val27*(1/(exp2((acc0*-1.4426950408889634f))+1.0f))*acc0);
  data0[alu1] = (val24*(1/(exp2((acc1*-1.4426950408889634f))+1.0f))*acc1);
  data0[alu2] = (val25*(1/(exp2((acc2*-1.4426950408889634f))+1.0f))*acc2);
  data0[alu3] = (val26*(1/(exp2((acc3*-1.4426950408889634f))+1.0f))*acc3);
}`;

const r_2048_16_512n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var val0 = data1[gidx0];
  var alu0 = (lidx0<<9);
  var val1 = data4[gidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 512; ridx0++) {
    var alu1 = ((gidx0<<13)+alu0+ridx0);
    var val2 = data2[(alu0+ridx0)];
    var val3 = atomicLoad(&data3[(alu1>>2)]);
    var alu2 = ((val3>>(((u32(alu1))&3u)<<3u))&255u);
    var precast0 = alu2;
    var precast1 = (select(0u,4294967040u,(0u<(alu2>>7u)))|bitcast<u32>(precast0));
    acc0 = (acc0+(val2*(f32((i32(bitcast<i32>(precast1)))))*val1));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val4 = temp0[ridx1];
      acc1 = (acc1+val4);
    }
    data0[gidx0] = (val0+acc1);
  }
}`;

const E_n4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<u32>;
@group(0) @binding(1)var<storage,read_write>data1:array<u32>;
@group(0) @binding(2)var<storage,read_write>data2:array<u32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = data2[0];
  var val1 = data2[1];
  var val2 = data1[0];
  var alu0 = (val2+val1);
  var alu1 = (val2+val0+alu0);
  var alu2 = (val0^val1^466688986u);
  var alu3 = ((alu1+537916423u)^((val2<<13u)+(val1<<13u)+((alu0+268958212u)>>19u)+4282417152u));
  var alu4 = (alu1+alu3);
  var alu5 = ((alu4+537916423u)^((alu3<<15u)+(alu3>>17u)));
  var alu6 = (alu4+alu5);
  var alu7 = ((alu6+537916423u)^((alu5<<26u)+(alu5>>6u)));
  var alu8 = (alu6+alu7);
  var alu9 = ((alu8+537916423u)^((alu7<<6u)+(alu7>>26u)));
  var alu10 = (alu9+alu2);
  var alu11 = (val1+alu8+alu10);
  var alu12 = ((alu11+537916424u)^((alu9<<17u)+(alu2<<17u)+((alu10+1u)>>15u)+131072u));
  var alu13 = (alu11+alu12);
  var alu14 = ((alu13+537916424u)^((alu12<<29u)+(alu12>>3u)));
  var alu15 = (alu13+alu14);
  var alu16 = ((alu15+537916424u)^((alu14<<16u)+(alu14>>16u)));
  var alu17 = (alu15+alu16);
  var alu18 = ((alu17+537916424u)^((alu16<<24u)+(alu16>>8u)));
  var alu19 = (val0+alu18);
  var alu20 = (alu19+alu17+alu2);
  var alu21 = ((alu20+537916426u)^((val0<<13u)+(alu18<<13u)+((alu19+2u)>>19u)+16384u));
  var alu22 = (alu20+alu21);
  var alu23 = ((alu22+537916426u)^((alu21<<15u)+(alu21>>17u)));
  var alu24 = (alu22+alu23);
  var alu25 = ((alu24+537916426u)^((alu23<<26u)+(alu23>>6u)));
  var alu26 = (alu24+alu25);
  var alu27 = ((alu26+537916426u)^((alu25<<6u)+(alu25>>26u)));
  var alu28 = (val1+alu27);
  var alu29 = (val0+alu26+alu28);
  var alu30 = ((alu29+537916429u)^((val1<<17u)+(alu27<<17u)+((alu28+3u)>>15u)+393216u));
  var alu31 = (alu29+alu30);
  var alu32 = ((alu31+537916429u)^((alu30<<29u)+(alu30>>3u)));
  var alu33 = (alu31+alu32);
  var alu34 = ((alu33+537916429u)^((alu32<<16u)+(alu32>>16u)));
  var alu35 = (alu33+alu34);
  var alu36 = ((alu35+537916429u)^((alu34<<24u)+(alu34>>8u)));
  var alu37 = (alu36+alu2);
  var alu38 = (val1+alu35+alu37);
  var alu39 = ((alu38+537916433u)^((alu36<<13u)+(alu2<<13u)+((alu37+4u)>>19u)+32768u));
  var alu40 = (alu38+alu39);
  var alu41 = ((alu40+537916433u)^((alu39<<15u)+(alu39>>17u)));
  var alu42 = (alu40+alu41);
  var alu43 = ((alu42+537916433u)^((alu41<<26u)+(alu41>>6u)));
  data0[0] = (val0+((alu42+alu43+537916433u)^((alu43<<6u)+(alu43>>26u)))+5u);
}`;

const E_n5 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<u32>;
@group(0) @binding(2)var<storage,read_write>data2:array<u32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = data2[0];
  var val1 = data2[1];
  var val2 = data1[0];
  var precast0 = 1.0f;
  var alu0 = (val2+val1);
  var alu1 = (val2+val0+alu0);
  var alu2 = (val0^val1^466688986u);
  var alu3 = ((alu1+537916423u)^((val2<<13u)+(val1<<13u)+((alu0+268958212u)>>19u)+4282417152u));
  var alu4 = (alu1+alu3);
  var alu5 = ((alu4+537916423u)^((alu3<<15u)+(alu3>>17u)));
  var alu6 = (alu4+alu5);
  var alu7 = ((alu6+537916423u)^((alu5<<26u)+(alu5>>6u)));
  var alu8 = (alu6+alu7);
  var alu9 = ((alu8+537916423u)^((alu7<<6u)+(alu7>>26u)));
  var alu10 = (alu9+alu2);
  var alu11 = (val1+alu8+alu10);
  var alu12 = ((alu11+537916424u)^((alu9<<17u)+(alu2<<17u)+((alu10+1u)>>15u)+131072u));
  var alu13 = (alu11+alu12);
  var alu14 = ((alu13+537916424u)^((alu12<<29u)+(alu12>>3u)));
  var alu15 = (alu13+alu14);
  var alu16 = ((alu15+537916424u)^((alu14<<16u)+(alu14>>16u)));
  var alu17 = (alu15+alu16);
  var alu18 = ((alu17+537916424u)^((alu16<<24u)+(alu16>>8u)));
  var alu19 = (val0+alu18);
  var alu20 = (alu19+alu17+alu2);
  var alu21 = ((alu20+537916426u)^((val0<<13u)+(alu18<<13u)+((alu19+2u)>>19u)+16384u));
  var alu22 = (alu20+alu21);
  var alu23 = ((alu22+537916426u)^((alu21<<15u)+(alu21>>17u)));
  var alu24 = (alu22+alu23);
  var alu25 = ((alu24+537916426u)^((alu23<<26u)+(alu23>>6u)));
  var alu26 = (alu24+alu25);
  var alu27 = ((alu26+537916426u)^((alu25<<6u)+(alu25>>26u)));
  var alu28 = (val1+alu27);
  var alu29 = (val0+alu26+alu28);
  var alu30 = ((alu29+537916429u)^((val1<<17u)+(alu27<<17u)+((alu28+3u)>>15u)+393216u));
  var alu31 = (alu29+alu30);
  var alu32 = ((alu31+537916429u)^((alu30<<29u)+(alu30>>3u)));
  var alu33 = (alu31+alu32);
  var alu34 = ((alu33+537916429u)^((alu32<<16u)+(alu32>>16u)));
  var alu35 = (alu33+alu34);
  var alu36 = ((alu35+537916429u)^((alu34<<24u)+(alu34>>8u)));
  var alu37 = (alu36+alu2);
  var alu38 = (val1+alu35+alu37);
  var alu39 = ((alu38+537916433u)^((alu36<<13u)+(alu2<<13u)+((alu37+4u)>>19u)+32768u));
  var alu40 = (alu38+alu39);
  var alu41 = ((alu40+537916433u)^((alu39<<15u)+(alu39>>17u)));
  var alu42 = (alu40+alu41);
  var precast1 = (bitcast<u32>(precast0)|((alu42+((alu42+537916433u)^((alu41<<26u)+(alu41>>6u)))+alu2+537916433u)>>9u));
  data0[0] = (bitcast<f32>(precast1)+-1.0f);
}`;

const r_8016_4_8_256_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 128>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@compute @workgroup_size(4,8) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8016 */
  var lidx0 = i32(lindex.x); /* 4 */
  var lidx1 = i32(lindex.y); /* 8 */
  var alu0 = (lidx0<<5);
  var alu1 = (lidx0+(gidx0<<4));
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 256; ridx0++) {
    var alu2 = (ridx0<<3);
    var val0 = data1[(lidx1+alu2)];
    var alu3 = (lidx1+(gidx0<<15)+(lidx0<<11)+alu2);
    var val1 = data2[alu3];
    var val2 = data2[(alu3+8192)];
    var val3 = data2[(alu3+16384)];
    var val4 = data2[(alu3+24576)];
    acc0 = (acc0+(val0*val1));
    acc1 = (acc1+(val0*val2));
    acc2 = (acc2+(val0*val3));
    acc3 = (acc3+(val0*val4));
  }
  var alu9 = (alu0+(lidx1<<2));
  temp0[alu9] = acc0;
  temp0[(alu9+1)] = acc1;
  temp0[(alu9+2)] = acc2;
  temp0[(alu9+3)] = acc3;
  workgroupBarrier();
  if (((bool(lidx1))!=true)) {
    var acc4 = 0.0f;
    var acc5 = 0.0f;
    var acc6 = 0.0f;
    var acc7 = 0.0f;
    for (var ridx1 = 0; ridx1 < 8; ridx1++) {
      var alu16 = (alu0+(ridx1<<2));
      var val5 = temp0[(alu16+1)];
      var val6 = temp0[(alu16+2)];
      var val7 = temp0[(alu16+3)];
      var val8 = temp0[alu16];
      acc4 = (acc4+val8);
      acc5 = (acc5+val5);
      acc6 = (acc6+val6);
      acc7 = (acc7+val7);
    }
    data0[alu1] = acc4;
    data0[(alu1+4)] = acc5;
    data0[(alu1+8)] = acc6;
    data0[(alu1+12)] = acc7;
  }
}`;

const r_8_32_501 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8 */
  var lidx0 = i32(lindex.x); /* 32 */
  var acc0 = (f32(-inf(1.0)));
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var val0 = data1[((gidx0*16032)+(lidx0*501)+ridx0)];
    var alu0 = (select(val0,(f32(-inf(1.0))),is_nan(val0))*1.0526315789473684f);
    acc0 = select(acc0,alu0,(acc0<alu0));
  }
  data0[(lidx0+(gidx0<<5))] = acc0;
}`;

const r_256 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 256>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(256) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 256 */
  var val0 = data1[lidx0];
  temp0[lidx0] = val0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc0 = (f32(-inf(1.0)));
    for (var ridx0 = 0; ridx0 < 256; ridx0++) {
      var val1 = temp0[ridx0];
      acc0 = select(acc0,val1,(acc0<val1));
    }
    data0[0] = acc0;
  }
}`;

const r_8_32_501n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8 */
  var lidx0 = i32(lindex.x); /* 32 */
  var val0 = data2[0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var val1 = data1[((gidx0*16032)+(lidx0*501)+ridx0)];
    acc0 = (acc0+exp2((((select(val1,(f32(-inf(1.0))),is_nan(val1))*1.0526315789473684f)-val0)*1.4426950408889634f)));
  }
  data0[(lidx0+(gidx0<<5))] = acc0;
}`;

const r_256n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 256>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(256) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 256 */
  var val0 = data1[lidx0];
  temp0[lidx0] = val0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc0 = 0.0f;
    for (var ridx0 = 0; ridx0 < 256; ridx0++) {
      var val1 = temp0[ridx0];
      acc0 = (acc0+val1);
    }
    data0[0] = acc0;
  }
}`;

const E_1336_32_3 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 1336 */
  var lidx0 = i32(lindex.x); /* 32 */
  var val0 = data2[0];
  var val1 = data3[0];
  var alu0 = ((gidx0*96)+(lidx0*3));
  var val2 = data1[alu0];
  var alu1 = (alu0+1);
  var val3 = data1[alu1];
  var alu2 = (alu0+2);
  var val4 = data1[alu2];
  var alu3 = (1/val1);
  data0[alu1] = (exp2((((select(val3,(f32(-inf(1.0))),is_nan(val3))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu3);
  data0[alu2] = (exp2((((select(val4,(f32(-inf(1.0))),is_nan(val4))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu3);
  data0[alu0] = (exp2((((select(val2,(f32(-inf(1.0))),is_nan(val2))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu3);
}`;

const r_167_16_3_16_64_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(3,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16 */
  var gidx1 = i32(gindex.y); /* 167 */
  var lidx0 = i32(lindex.x); /* 3 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (gidx0<<4);
  var alu1 = (gidx1*768);
  var alu2 = (lidx0<<8);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var alu3 = (lidx1+alu0+(ridx0<<2));
    var alu4 = (alu3+alu1+alu2);
    var val0 = select(0.0f, data1[(alu4+-252)], ((alu3<252)!=true));
    var val1 = select(0.0f, data1[(alu4+-253)], ((alu3<253)!=true));
    var val2 = select(0.0f, data1[(alu4+-254)], ((alu3<254)!=true));
    var val3 = select(0.0f, data1[(alu4+-255)], ((alu3<255)!=true));
    acc0 = (acc0+val0+val1+val3+val2);
  }
  data0[(lidx1+alu0+alu1+alu2)] = acc0;
}`;

const r_167_3_501 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(3) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 167 */
  var lidx0 = i32(lindex.x); /* 3 */
  var alu0 = (lidx0+(gidx0*3));
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var val0 = select(0.0f, data1[((gidx0*768)+(lidx0<<8)+(ridx0<<8)+-128001)], (((alu0+ridx0)<501)!=true));
    acc0 = (acc0+val0);
  }
  data0[alu0] = acc0;
}`;

const r_8_32_501n2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<i32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8 */
  var lidx0 = i32(lindex.x); /* 32 */
  var val0 = data2[128255];
  var val1 = data3[500];
  var val2 = data1[0];
  var acc0 = 0;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var alu0 = ((gidx0*16032)+(lidx0*501)+ridx0);
    var val3 = data2[alu0];
    var val4 = data3[(alu0>>8)];
    acc0 = (acc0+(i32(((val2<((1/(val0+val1))*(val3+val4)))!=true))));
  }
  data0[(lidx0+(gidx0<<5))] = acc0;
}`;

const r_256n2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<i32, 256>;
@group(0) @binding(0)var<storage,read_write>data0:array<i32>;
@group(0) @binding(1)var<storage,read_write>data1:array<i32>;
@compute @workgroup_size(256) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 256 */
  var val0 = data1[lidx0];
  temp0[lidx0] = val0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc0 = 0;
    for (var ridx0 = 0; ridx0 < 256; ridx0++) {
      var val1 = temp0[ridx0];
      acc0 = (acc0+val1);
    }
    data0[0] = acc0;
  }
}`;

    return {
      "setup": async (device, state_dict, progress) => {

        const buf_0 = createEmptyBuf(device, 2097152);
   const buf_1 = createWeightBuf(device, 513024, state_dict['tok_embeddings.arange'].bytes);
   const input0 = createEmptyBuf(device, 4);
   const buf_2 = createWeightBuf(device, 1050673152, state_dict['tok_embeddings.weight'].bytes);
   const buf_3 = createEmptyBuf(device, 8192);
   const buf_4 = createEmptyBuf(device, 4);
   const buf_5 = createEmptyBuf(device, 8192);
   const buf_6 = createWeightBuf(device, 8192, state_dict['layers.0.attention_norm.weight'].bytes);
   const buf_7 = createEmptyBuf(device, 2048);
   const buf_8 = createWeightBuf(device, 1048576, state_dict['layers.0.attention.wk.weight'].bytes);
   const buf_9 = createWeightBuf(device, 2048, state_dict['layers.0.attention.wk.scale'].bytes);
   const buf_10 = createEmptyBuf(device, 2048);
   const buf_11 = createWeightBuf(device, 1048576, state_dict['layers.0.attention.wv.weight'].bytes);
   const buf_12 = createWeightBuf(device, 2048, state_dict['layers.0.attention.wv.scale'].bytes);
   const buf_13 = createEmptyBuf(device, 4194304);
   const buf_14 = createWeightBuf(device, 524288, state_dict['freqs_cis'].bytes);
   const buf_15 = createEmptyBuf(device, 8192);
   const buf_16 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.wq.weight'].bytes);
   const buf_17 = createWeightBuf(device, 8192, state_dict['layers.0.attention.wq.scale'].bytes);
   const buf_18 = createEmptyBuf(device, 8192);
   const buf_19 = createEmptyBuf(device, 131200);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(42, 100, 'Launching WebGPU model:');
   const buf_20 = createEmptyBuf(device, 128);
   const buf_21 = createEmptyBuf(device, 128);
   const buf_22 = createEmptyBuf(device, 131200);
   const buf_23 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.wo.weight'].bytes);
   const buf_24 = createWeightBuf(device, 8192, state_dict['layers.0.attention.wo.scale'].bytes);
   const buf_25 = createWeightBuf(device, 8192, state_dict['layers.0.ffn_norm.weight'].bytes);
   const buf_26 = createEmptyBuf(device, 32768);
   const buf_27 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w3.weight'].bytes);
   const buf_28 = createWeightBuf(device, 32768, state_dict['layers.0.feed_forward.w3.scale'].bytes);
   const buf_29 = createEmptyBuf(device, 32768);
   const buf_30 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w1.weight'].bytes);
   const buf_31 = createWeightBuf(device, 32768, state_dict['layers.0.feed_forward.w1.scale'].bytes);
   const buf_32 = createEmptyBuf(device, 8192);
   const buf_33 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w2.weight'].bytes);
   const buf_34 = createWeightBuf(device, 8192, state_dict['layers.0.feed_forward.w2.scale'].bytes);
   const buf_35 = createEmptyBuf(device, 8192);
   const buf_36 = createWeightBuf(device, 8192, state_dict['layers.1.attention_norm.weight'].bytes);
   const buf_37 = createEmptyBuf(device, 2048);
   const buf_38 = createWeightBuf(device, 1048576, state_dict['layers.1.attention.wk.weight'].bytes);
   const buf_39 = createWeightBuf(device, 2048, state_dict['layers.1.attention.wk.scale'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(44, 100, 'Launching WebGPU model:');
   const buf_40 = createEmptyBuf(device, 2048);
   const buf_41 = createWeightBuf(device, 1048576, state_dict['layers.1.attention.wv.weight'].bytes);
   const buf_42 = createWeightBuf(device, 2048, state_dict['layers.1.attention.wv.scale'].bytes);
   const buf_43 = createEmptyBuf(device, 4194304);
   const buf_44 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.wq.weight'].bytes);
   const buf_45 = createWeightBuf(device, 8192, state_dict['layers.1.attention.wq.scale'].bytes);
   const buf_46 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.wo.weight'].bytes);
   const buf_47 = createWeightBuf(device, 8192, state_dict['layers.1.attention.wo.scale'].bytes);
   const buf_48 = createWeightBuf(device, 8192, state_dict['layers.1.ffn_norm.weight'].bytes);
   const buf_49 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w3.weight'].bytes);
   const buf_50 = createWeightBuf(device, 32768, state_dict['layers.1.feed_forward.w3.scale'].bytes);
   const buf_51 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w1.weight'].bytes);
   const buf_52 = createWeightBuf(device, 32768, state_dict['layers.1.feed_forward.w1.scale'].bytes);
   const buf_53 = createEmptyBuf(device, 8192);
   const buf_54 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w2.weight'].bytes);
   const buf_55 = createWeightBuf(device, 8192, state_dict['layers.1.feed_forward.w2.scale'].bytes);
   const buf_56 = createEmptyBuf(device, 8192);
   const buf_57 = createWeightBuf(device, 8192, state_dict['layers.2.attention_norm.weight'].bytes);
   const buf_58 = createEmptyBuf(device, 2048);
   const buf_59 = createWeightBuf(device, 1048576, state_dict['layers.2.attention.wk.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(46, 100, 'Launching WebGPU model:');
   const buf_60 = createWeightBuf(device, 2048, state_dict['layers.2.attention.wk.scale'].bytes);
   const buf_61 = createEmptyBuf(device, 2048);
   const buf_62 = createWeightBuf(device, 1048576, state_dict['layers.2.attention.wv.weight'].bytes);
   const buf_63 = createWeightBuf(device, 2048, state_dict['layers.2.attention.wv.scale'].bytes);
   const buf_64 = createEmptyBuf(device, 4194304);
   const buf_65 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.wq.weight'].bytes);
   const buf_66 = createWeightBuf(device, 8192, state_dict['layers.2.attention.wq.scale'].bytes);
   const buf_67 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.wo.weight'].bytes);
   const buf_68 = createWeightBuf(device, 8192, state_dict['layers.2.attention.wo.scale'].bytes);
   const buf_69 = createWeightBuf(device, 8192, state_dict['layers.2.ffn_norm.weight'].bytes);
   const buf_70 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w3.weight'].bytes);
   const buf_71 = createWeightBuf(device, 32768, state_dict['layers.2.feed_forward.w3.scale'].bytes);
   const buf_72 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w1.weight'].bytes);
   const buf_73 = createWeightBuf(device, 32768, state_dict['layers.2.feed_forward.w1.scale'].bytes);
   const buf_74 = createEmptyBuf(device, 8192);
   const buf_75 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w2.weight'].bytes);
   const buf_76 = createWeightBuf(device, 8192, state_dict['layers.2.feed_forward.w2.scale'].bytes);
   const buf_77 = createEmptyBuf(device, 8192);
   const buf_78 = createWeightBuf(device, 8192, state_dict['layers.3.attention_norm.weight'].bytes);
   const buf_79 = createEmptyBuf(device, 2048);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(48, 100, 'Launching WebGPU model:');
   const buf_80 = createWeightBuf(device, 1048576, state_dict['layers.3.attention.wk.weight'].bytes);
   const buf_81 = createWeightBuf(device, 2048, state_dict['layers.3.attention.wk.scale'].bytes);
   const buf_82 = createEmptyBuf(device, 2048);
   const buf_83 = createWeightBuf(device, 1048576, state_dict['layers.3.attention.wv.weight'].bytes);
   const buf_84 = createWeightBuf(device, 2048, state_dict['layers.3.attention.wv.scale'].bytes);
   const buf_85 = createEmptyBuf(device, 4194304);
   const buf_86 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.wq.weight'].bytes);
   const buf_87 = createWeightBuf(device, 8192, state_dict['layers.3.attention.wq.scale'].bytes);
   const buf_88 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.wo.weight'].bytes);
   const buf_89 = createWeightBuf(device, 8192, state_dict['layers.3.attention.wo.scale'].bytes);
   const buf_90 = createWeightBuf(device, 8192, state_dict['layers.3.ffn_norm.weight'].bytes);
   const buf_91 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w3.weight'].bytes);
   const buf_92 = createWeightBuf(device, 32768, state_dict['layers.3.feed_forward.w3.scale'].bytes);
   const buf_93 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w1.weight'].bytes);
   const buf_94 = createWeightBuf(device, 32768, state_dict['layers.3.feed_forward.w1.scale'].bytes);
   const buf_95 = createEmptyBuf(device, 8192);
   const buf_96 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w2.weight'].bytes);
   const buf_97 = createWeightBuf(device, 8192, state_dict['layers.3.feed_forward.w2.scale'].bytes);
   const buf_98 = createEmptyBuf(device, 8192);
   const buf_99 = createWeightBuf(device, 8192, state_dict['layers.4.attention_norm.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(51, 100, 'Launching WebGPU model:');
   const buf_100 = createEmptyBuf(device, 2048);
   const buf_101 = createWeightBuf(device, 1048576, state_dict['layers.4.attention.wk.weight'].bytes);
   const buf_102 = createWeightBuf(device, 2048, state_dict['layers.4.attention.wk.scale'].bytes);
   const buf_103 = createEmptyBuf(device, 2048);
   const buf_104 = createWeightBuf(device, 1048576, state_dict['layers.4.attention.wv.weight'].bytes);
   const buf_105 = createWeightBuf(device, 2048, state_dict['layers.4.attention.wv.scale'].bytes);
   const buf_106 = createEmptyBuf(device, 4194304);
   const buf_107 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.wq.weight'].bytes);
   const buf_108 = createWeightBuf(device, 8192, state_dict['layers.4.attention.wq.scale'].bytes);
   const buf_109 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.wo.weight'].bytes);
   const buf_110 = createWeightBuf(device, 8192, state_dict['layers.4.attention.wo.scale'].bytes);
   const buf_111 = createWeightBuf(device, 8192, state_dict['layers.4.ffn_norm.weight'].bytes);
   const buf_112 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w3.weight'].bytes);
   const buf_113 = createWeightBuf(device, 32768, state_dict['layers.4.feed_forward.w3.scale'].bytes);
   const buf_114 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w1.weight'].bytes);
   const buf_115 = createWeightBuf(device, 32768, state_dict['layers.4.feed_forward.w1.scale'].bytes);
   const buf_116 = createEmptyBuf(device, 8192);
   const buf_117 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w2.weight'].bytes);
   const buf_118 = createWeightBuf(device, 8192, state_dict['layers.4.feed_forward.w2.scale'].bytes);
   const buf_119 = createEmptyBuf(device, 8192);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(53, 100, 'Launching WebGPU model:');
   const buf_120 = createWeightBuf(device, 8192, state_dict['layers.5.attention_norm.weight'].bytes);
   const buf_121 = createEmptyBuf(device, 2048);
   const buf_122 = createWeightBuf(device, 1048576, state_dict['layers.5.attention.wk.weight'].bytes);
   const buf_123 = createWeightBuf(device, 2048, state_dict['layers.5.attention.wk.scale'].bytes);
   const buf_124 = createEmptyBuf(device, 2048);
   const buf_125 = createWeightBuf(device, 1048576, state_dict['layers.5.attention.wv.weight'].bytes);
   const buf_126 = createWeightBuf(device, 2048, state_dict['layers.5.attention.wv.scale'].bytes);
   const buf_127 = createEmptyBuf(device, 4194304);
   const buf_128 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.wq.weight'].bytes);
   const buf_129 = createWeightBuf(device, 8192, state_dict['layers.5.attention.wq.scale'].bytes);
   const buf_130 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.wo.weight'].bytes);
   const buf_131 = createWeightBuf(device, 8192, state_dict['layers.5.attention.wo.scale'].bytes);
   const buf_132 = createWeightBuf(device, 8192, state_dict['layers.5.ffn_norm.weight'].bytes);
   const buf_133 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w3.weight'].bytes);
   const buf_134 = createWeightBuf(device, 32768, state_dict['layers.5.feed_forward.w3.scale'].bytes);
   const buf_135 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w1.weight'].bytes);
   const buf_136 = createWeightBuf(device, 32768, state_dict['layers.5.feed_forward.w1.scale'].bytes);
   const buf_137 = createEmptyBuf(device, 8192);
   const buf_138 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w2.weight'].bytes);
   const buf_139 = createWeightBuf(device, 8192, state_dict['layers.5.feed_forward.w2.scale'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(55, 100, 'Launching WebGPU model:');
   const buf_140 = createEmptyBuf(device, 8192);
   const buf_141 = createWeightBuf(device, 8192, state_dict['layers.6.attention_norm.weight'].bytes);
   const buf_142 = createEmptyBuf(device, 2048);
   const buf_143 = createWeightBuf(device, 1048576, state_dict['layers.6.attention.wk.weight'].bytes);
   const buf_144 = createWeightBuf(device, 2048, state_dict['layers.6.attention.wk.scale'].bytes);
   const buf_145 = createEmptyBuf(device, 2048);
   const buf_146 = createWeightBuf(device, 1048576, state_dict['layers.6.attention.wv.weight'].bytes);
   const buf_147 = createWeightBuf(device, 2048, state_dict['layers.6.attention.wv.scale'].bytes);
   const buf_148 = createEmptyBuf(device, 4194304);
   const buf_149 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.wq.weight'].bytes);
   const buf_150 = createWeightBuf(device, 8192, state_dict['layers.6.attention.wq.scale'].bytes);
   const buf_151 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.wo.weight'].bytes);
   const buf_152 = createWeightBuf(device, 8192, state_dict['layers.6.attention.wo.scale'].bytes);
   const buf_153 = createWeightBuf(device, 8192, state_dict['layers.6.ffn_norm.weight'].bytes);
   const buf_154 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w3.weight'].bytes);
   const buf_155 = createWeightBuf(device, 32768, state_dict['layers.6.feed_forward.w3.scale'].bytes);
   const buf_156 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w1.weight'].bytes);
   const buf_157 = createWeightBuf(device, 32768, state_dict['layers.6.feed_forward.w1.scale'].bytes);
   const buf_158 = createEmptyBuf(device, 8192);
   const buf_159 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w2.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(57, 100, 'Launching WebGPU model:');
   const buf_160 = createWeightBuf(device, 8192, state_dict['layers.6.feed_forward.w2.scale'].bytes);
   const buf_161 = createEmptyBuf(device, 8192);
   const buf_162 = createWeightBuf(device, 8192, state_dict['layers.7.attention_norm.weight'].bytes);
   const buf_163 = createEmptyBuf(device, 2048);
   const buf_164 = createWeightBuf(device, 1048576, state_dict['layers.7.attention.wk.weight'].bytes);
   const buf_165 = createWeightBuf(device, 2048, state_dict['layers.7.attention.wk.scale'].bytes);
   const buf_166 = createEmptyBuf(device, 2048);
   const buf_167 = createWeightBuf(device, 1048576, state_dict['layers.7.attention.wv.weight'].bytes);
   const buf_168 = createWeightBuf(device, 2048, state_dict['layers.7.attention.wv.scale'].bytes);
   const buf_169 = createEmptyBuf(device, 4194304);
   const buf_170 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.wq.weight'].bytes);
   const buf_171 = createWeightBuf(device, 8192, state_dict['layers.7.attention.wq.scale'].bytes);
   const buf_172 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.wo.weight'].bytes);
   const buf_173 = createWeightBuf(device, 8192, state_dict['layers.7.attention.wo.scale'].bytes);
   const buf_174 = createWeightBuf(device, 8192, state_dict['layers.7.ffn_norm.weight'].bytes);
   const buf_175 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w3.weight'].bytes);
   const buf_176 = createWeightBuf(device, 32768, state_dict['layers.7.feed_forward.w3.scale'].bytes);
   const buf_177 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w1.weight'].bytes);
   const buf_178 = createWeightBuf(device, 32768, state_dict['layers.7.feed_forward.w1.scale'].bytes);
   const buf_179 = createEmptyBuf(device, 8192);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(59, 100, 'Launching WebGPU model:');
   const buf_180 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w2.weight'].bytes);
   const buf_181 = createWeightBuf(device, 8192, state_dict['layers.7.feed_forward.w2.scale'].bytes);
   const buf_182 = createEmptyBuf(device, 8192);
   const buf_183 = createWeightBuf(device, 8192, state_dict['layers.8.attention_norm.weight'].bytes);
   const buf_184 = createEmptyBuf(device, 2048);
   const buf_185 = createWeightBuf(device, 1048576, state_dict['layers.8.attention.wk.weight'].bytes);
   const buf_186 = createWeightBuf(device, 2048, state_dict['layers.8.attention.wk.scale'].bytes);
   const buf_187 = createEmptyBuf(device, 2048);
   const buf_188 = createWeightBuf(device, 1048576, state_dict['layers.8.attention.wv.weight'].bytes);
   const buf_189 = createWeightBuf(device, 2048, state_dict['layers.8.attention.wv.scale'].bytes);
   const buf_190 = createEmptyBuf(device, 4194304);
   const buf_191 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.wq.weight'].bytes);
   const buf_192 = createWeightBuf(device, 8192, state_dict['layers.8.attention.wq.scale'].bytes);
   const buf_193 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.wo.weight'].bytes);
   const buf_194 = createWeightBuf(device, 8192, state_dict['layers.8.attention.wo.scale'].bytes);
   const buf_195 = createWeightBuf(device, 8192, state_dict['layers.8.ffn_norm.weight'].bytes);
   const buf_196 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w3.weight'].bytes);
   const buf_197 = createWeightBuf(device, 32768, state_dict['layers.8.feed_forward.w3.scale'].bytes);
   const buf_198 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w1.weight'].bytes);
   const buf_199 = createWeightBuf(device, 32768, state_dict['layers.8.feed_forward.w1.scale'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(61, 100, 'Launching WebGPU model:');
   const buf_200 = createEmptyBuf(device, 8192);
   const buf_201 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w2.weight'].bytes);
   const buf_202 = createWeightBuf(device, 8192, state_dict['layers.8.feed_forward.w2.scale'].bytes);
   const buf_203 = createEmptyBuf(device, 8192);
   const buf_204 = createWeightBuf(device, 8192, state_dict['layers.9.attention_norm.weight'].bytes);
   const buf_205 = createEmptyBuf(device, 2048);
   const buf_206 = createWeightBuf(device, 1048576, state_dict['layers.9.attention.wk.weight'].bytes);
   const buf_207 = createWeightBuf(device, 2048, state_dict['layers.9.attention.wk.scale'].bytes);
   const buf_208 = createEmptyBuf(device, 2048);
   const buf_209 = createWeightBuf(device, 1048576, state_dict['layers.9.attention.wv.weight'].bytes);
   const buf_210 = createWeightBuf(device, 2048, state_dict['layers.9.attention.wv.scale'].bytes);
   const buf_211 = createEmptyBuf(device, 4194304);
   const buf_212 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.wq.weight'].bytes);
   const buf_213 = createWeightBuf(device, 8192, state_dict['layers.9.attention.wq.scale'].bytes);
   const buf_214 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.wo.weight'].bytes);
   const buf_215 = createWeightBuf(device, 8192, state_dict['layers.9.attention.wo.scale'].bytes);
   const buf_216 = createWeightBuf(device, 8192, state_dict['layers.9.ffn_norm.weight'].bytes);
   const buf_217 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w3.weight'].bytes);
   const buf_218 = createWeightBuf(device, 32768, state_dict['layers.9.feed_forward.w3.scale'].bytes);
   const buf_219 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w1.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(64, 100, 'Launching WebGPU model:');
   const buf_220 = createWeightBuf(device, 32768, state_dict['layers.9.feed_forward.w1.scale'].bytes);
   const buf_221 = createEmptyBuf(device, 8192);
   const buf_222 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w2.weight'].bytes);
   const buf_223 = createWeightBuf(device, 8192, state_dict['layers.9.feed_forward.w2.scale'].bytes);
   const buf_224 = createEmptyBuf(device, 8192);
   const buf_225 = createWeightBuf(device, 8192, state_dict['layers.10.attention_norm.weight'].bytes);
   const buf_226 = createEmptyBuf(device, 2048);
   const buf_227 = createWeightBuf(device, 1048576, state_dict['layers.10.attention.wk.weight'].bytes);
   const buf_228 = createWeightBuf(device, 2048, state_dict['layers.10.attention.wk.scale'].bytes);
   const buf_229 = createEmptyBuf(device, 2048);
   const buf_230 = createWeightBuf(device, 1048576, state_dict['layers.10.attention.wv.weight'].bytes);
   const buf_231 = createWeightBuf(device, 2048, state_dict['layers.10.attention.wv.scale'].bytes);
   const buf_232 = createEmptyBuf(device, 4194304);
   const buf_233 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.wq.weight'].bytes);
   const buf_234 = createWeightBuf(device, 8192, state_dict['layers.10.attention.wq.scale'].bytes);
   const buf_235 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.wo.weight'].bytes);
   const buf_236 = createWeightBuf(device, 8192, state_dict['layers.10.attention.wo.scale'].bytes);
   const buf_237 = createWeightBuf(device, 8192, state_dict['layers.10.ffn_norm.weight'].bytes);
   const buf_238 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w3.weight'].bytes);
   const buf_239 = createWeightBuf(device, 32768, state_dict['layers.10.feed_forward.w3.scale'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(66, 100, 'Launching WebGPU model:');
   const buf_240 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w1.weight'].bytes);
   const buf_241 = createWeightBuf(device, 32768, state_dict['layers.10.feed_forward.w1.scale'].bytes);
   const buf_242 = createEmptyBuf(device, 8192);
   const buf_243 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w2.weight'].bytes);
   const buf_244 = createWeightBuf(device, 8192, state_dict['layers.10.feed_forward.w2.scale'].bytes);
   const buf_245 = createEmptyBuf(device, 8192);
   const buf_246 = createWeightBuf(device, 8192, state_dict['layers.11.attention_norm.weight'].bytes);
   const buf_247 = createEmptyBuf(device, 2048);
   const buf_248 = createWeightBuf(device, 1048576, state_dict['layers.11.attention.wk.weight'].bytes);
   const buf_249 = createWeightBuf(device, 2048, state_dict['layers.11.attention.wk.scale'].bytes);
   const buf_250 = createEmptyBuf(device, 2048);
   const buf_251 = createWeightBuf(device, 1048576, state_dict['layers.11.attention.wv.weight'].bytes);
   const buf_252 = createWeightBuf(device, 2048, state_dict['layers.11.attention.wv.scale'].bytes);
   const buf_253 = createEmptyBuf(device, 4194304);
   const buf_254 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.wq.weight'].bytes);
   const buf_255 = createWeightBuf(device, 8192, state_dict['layers.11.attention.wq.scale'].bytes);
   const buf_256 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.wo.weight'].bytes);
   const buf_257 = createWeightBuf(device, 8192, state_dict['layers.11.attention.wo.scale'].bytes);
   const buf_258 = createWeightBuf(device, 8192, state_dict['layers.11.ffn_norm.weight'].bytes);
   const buf_259 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w3.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(68, 100, 'Launching WebGPU model:');
   const buf_260 = createWeightBuf(device, 32768, state_dict['layers.11.feed_forward.w3.scale'].bytes);
   const buf_261 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w1.weight'].bytes);
   const buf_262 = createWeightBuf(device, 32768, state_dict['layers.11.feed_forward.w1.scale'].bytes);
   const buf_263 = createEmptyBuf(device, 8192);
   const buf_264 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w2.weight'].bytes);
   const buf_265 = createWeightBuf(device, 8192, state_dict['layers.11.feed_forward.w2.scale'].bytes);
   const buf_266 = createEmptyBuf(device, 8192);
   const buf_267 = createWeightBuf(device, 8192, state_dict['layers.12.attention_norm.weight'].bytes);
   const buf_268 = createEmptyBuf(device, 2048);
   const buf_269 = createWeightBuf(device, 1048576, state_dict['layers.12.attention.wk.weight'].bytes);
   const buf_270 = createWeightBuf(device, 2048, state_dict['layers.12.attention.wk.scale'].bytes);
   const buf_271 = createEmptyBuf(device, 2048);
   const buf_272 = createWeightBuf(device, 1048576, state_dict['layers.12.attention.wv.weight'].bytes);
   const buf_273 = createWeightBuf(device, 2048, state_dict['layers.12.attention.wv.scale'].bytes);
   const buf_274 = createEmptyBuf(device, 4194304);
   const buf_275 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.wq.weight'].bytes);
   const buf_276 = createWeightBuf(device, 8192, state_dict['layers.12.attention.wq.scale'].bytes);
   const buf_277 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.wo.weight'].bytes);
   const buf_278 = createWeightBuf(device, 8192, state_dict['layers.12.attention.wo.scale'].bytes);
   const buf_279 = createWeightBuf(device, 8192, state_dict['layers.12.ffn_norm.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(70, 100, 'Launching WebGPU model:');
   const buf_280 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w3.weight'].bytes);
   const buf_281 = createWeightBuf(device, 32768, state_dict['layers.12.feed_forward.w3.scale'].bytes);
   const buf_282 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w1.weight'].bytes);
   const buf_283 = createWeightBuf(device, 32768, state_dict['layers.12.feed_forward.w1.scale'].bytes);
   const buf_284 = createEmptyBuf(device, 8192);
   const buf_285 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w2.weight'].bytes);
   const buf_286 = createWeightBuf(device, 8192, state_dict['layers.12.feed_forward.w2.scale'].bytes);
   const buf_287 = createEmptyBuf(device, 8192);
   const buf_288 = createWeightBuf(device, 8192, state_dict['layers.13.attention_norm.weight'].bytes);
   const buf_289 = createEmptyBuf(device, 2048);
   const buf_290 = createWeightBuf(device, 1048576, state_dict['layers.13.attention.wk.weight'].bytes);
   const buf_291 = createWeightBuf(device, 2048, state_dict['layers.13.attention.wk.scale'].bytes);
   const buf_292 = createEmptyBuf(device, 2048);
   const buf_293 = createWeightBuf(device, 1048576, state_dict['layers.13.attention.wv.weight'].bytes);
   const buf_294 = createWeightBuf(device, 2048, state_dict['layers.13.attention.wv.scale'].bytes);
   const buf_295 = createEmptyBuf(device, 4194304);
   const buf_296 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.wq.weight'].bytes);
   const buf_297 = createWeightBuf(device, 8192, state_dict['layers.13.attention.wq.scale'].bytes);
   const buf_298 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.wo.weight'].bytes);
   const buf_299 = createWeightBuf(device, 8192, state_dict['layers.13.attention.wo.scale'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(72, 100, 'Launching WebGPU model:');
   const buf_300 = createWeightBuf(device, 8192, state_dict['layers.13.ffn_norm.weight'].bytes);
   const buf_301 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w3.weight'].bytes);
   const buf_302 = createWeightBuf(device, 32768, state_dict['layers.13.feed_forward.w3.scale'].bytes);
   const buf_303 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w1.weight'].bytes);
   const buf_304 = createWeightBuf(device, 32768, state_dict['layers.13.feed_forward.w1.scale'].bytes);
   const buf_305 = createEmptyBuf(device, 8192);
   const buf_306 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w2.weight'].bytes);
   const buf_307 = createWeightBuf(device, 8192, state_dict['layers.13.feed_forward.w2.scale'].bytes);
   const buf_308 = createEmptyBuf(device, 8192);
   const buf_309 = createWeightBuf(device, 8192, state_dict['layers.14.attention_norm.weight'].bytes);
   const buf_310 = createEmptyBuf(device, 2048);
   const buf_311 = createWeightBuf(device, 1048576, state_dict['layers.14.attention.wk.weight'].bytes);
   const buf_312 = createWeightBuf(device, 2048, state_dict['layers.14.attention.wk.scale'].bytes);
   const buf_313 = createEmptyBuf(device, 2048);
   const buf_314 = createWeightBuf(device, 1048576, state_dict['layers.14.attention.wv.weight'].bytes);
   const buf_315 = createWeightBuf(device, 2048, state_dict['layers.14.attention.wv.scale'].bytes);
   const buf_316 = createEmptyBuf(device, 4194304);
   const buf_317 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.wq.weight'].bytes);
   const buf_318 = createWeightBuf(device, 8192, state_dict['layers.14.attention.wq.scale'].bytes);
   const buf_319 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.wo.weight'].bytes);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(75, 100, 'Launching WebGPU model:');
   const buf_320 = createWeightBuf(device, 8192, state_dict['layers.14.attention.wo.scale'].bytes);
   const buf_321 = createWeightBuf(device, 8192, state_dict['layers.14.ffn_norm.weight'].bytes);
   const buf_322 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w3.weight'].bytes);
   const buf_323 = createWeightBuf(device, 32768, state_dict['layers.14.feed_forward.w3.scale'].bytes);
   const buf_324 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w1.weight'].bytes);
   const buf_325 = createWeightBuf(device, 32768, state_dict['layers.14.feed_forward.w1.scale'].bytes);
   const buf_326 = createEmptyBuf(device, 8192);
   const buf_327 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w2.weight'].bytes);
   const buf_328 = createWeightBuf(device, 8192, state_dict['layers.14.feed_forward.w2.scale'].bytes);
   const buf_329 = createEmptyBuf(device, 8192);
   const buf_330 = createWeightBuf(device, 8192, state_dict['layers.15.attention_norm.weight'].bytes);
   const buf_331 = createEmptyBuf(device, 2048);
   const buf_332 = createWeightBuf(device, 1048576, state_dict['layers.15.attention.wk.weight'].bytes);
   const buf_333 = createWeightBuf(device, 2048, state_dict['layers.15.attention.wk.scale'].bytes);
   const buf_334 = createEmptyBuf(device, 2048);
   const buf_335 = createWeightBuf(device, 1048576, state_dict['layers.15.attention.wv.weight'].bytes);
   const buf_336 = createWeightBuf(device, 2048, state_dict['layers.15.attention.wv.scale'].bytes);
   const buf_337 = createEmptyBuf(device, 4194304);
   const buf_338 = createEmptyBuf(device, 4);
   const buf_339 = createEmptyBuf(device, 4);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(77, 100, 'Launching WebGPU model:');
   const buf_340 = createEmptyBuf(device, 8);
   const buf_341 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.wq.weight'].bytes);
   const buf_342 = createWeightBuf(device, 8192, state_dict['layers.15.attention.wq.scale'].bytes);
   const buf_343 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.wo.weight'].bytes);
   const buf_344 = createWeightBuf(device, 8192, state_dict['layers.15.attention.wo.scale'].bytes);
   const buf_345 = createEmptyBuf(device, 4);
   const buf_346 = createWeightBuf(device, 8192, state_dict['layers.15.ffn_norm.weight'].bytes);
   const buf_347 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w3.weight'].bytes);
   const buf_348 = createWeightBuf(device, 32768, state_dict['layers.15.feed_forward.w3.scale'].bytes);
   const buf_349 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w1.weight'].bytes);
   const buf_350 = createWeightBuf(device, 32768, state_dict['layers.15.feed_forward.w1.scale'].bytes);
   const buf_351 = createEmptyBuf(device, 8192);
   const buf_352 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w2.weight'].bytes);
   const buf_353 = createWeightBuf(device, 8192, state_dict['layers.15.feed_forward.w2.scale'].bytes);
   const buf_354 = createWeightBuf(device, 8192, state_dict['norm.weight'].bytes);
   const buf_355 = createEmptyBuf(device, 513024);
   //const buf_356 = createWeightBuf(device, 1050673152, state_dict['output.weight'].bytes);
   const buf_356 = buf_2;
   const buf_357 = createEmptyBuf(device, 1024);
   const buf_358 = createEmptyBuf(device, 4);
   const buf_359 = createEmptyBuf(device, 513024);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(79, 100, 'Launching WebGPU model:');
   const buf_360 = createEmptyBuf(device, 513024);
   const buf_361 = createEmptyBuf(device, 2004);
   const buf_362 = createEmptyBuf(device, 1024);
   const output0 = createEmptyBuf(device, 4);
   const input1 = createUniformBuf(device, 4);

        const gpuWriteBuffer0 = device.createBuffer({size:input0.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });
    const gpuWriteBuffer1 = device.createBuffer({size:input1.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });
        const gpuReadBuffer = device.createBuffer({ size: output0.size, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });

        const kernels = [r_64_16_8_16_501_4, r_2048_16_16, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, r_2048_16_128n2, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_512_16_128n1, r_512_16_128n1, E_4_8_16_2n1, E_n4, r_2048_16_128n2, E_n5, E_2_8_16_2_4, r_2_28start_pos2B129_4_8_8_4, r_32_28start_pos2B129, r_32_28start_pos2B129n1, E_28start_pos2B129_8_4, r_4_8_16_28start_pos2B129_4, r_2048_16_128n3, r_256_8, E_16_32_4, r_64_32_512_4_4n1, r_64_32_512_4_4n2, r_2048_16_512n1, r_256_8, E_16_32_4, r_8016_4_8_256_4, r_8_32_501, r_256, r_8_32_501n1, r_256n1, E_1336_32_3, r_167_16_3_16_64_4, r_167_3_501, r_8_32_501n2, r_256n2];
        
        const piplines = [];
        for (let i=0; i<kernels.length; i++) {
          const name = kernels[i];
          const pipeline = await device.createComputePipelineAsync({layout: "auto", compute: { module: device.createShaderModule({ code: name }), entryPoint: "main" }});
          piplines.push(pipeline);
          if (i % 5 === 0) await new Promise(resolve => setTimeout(resolve, 0)); // prevent browser lag
          if (i / kernels.length > 0.33) {progress(86, 100, "Launching WebGPU model:");}
          if (i / kernels.length > 0.66) {progress(93, 100, "Launching WebGPU model:");}
        }

        return async (data0,data1) => {
            const commandEncoder = device.createCommandEncoder();

            await gpuWriteBuffer0.mapAsync(GPUMapMode.WRITE);
    new Int32Array(gpuWriteBuffer0.getMappedRange()).set(data0);
    gpuWriteBuffer0.unmap();
commandEncoder.copyBufferToBuffer(gpuWriteBuffer0, 0, input0, 0, gpuWriteBuffer0.size);
    await gpuWriteBuffer1.mapAsync(GPUMapMode.WRITE);
    new Int32Array(gpuWriteBuffer1.getMappedRange()).set(data1);
    gpuWriteBuffer1.unmap();
commandEncoder.copyBufferToBuffer(gpuWriteBuffer1, 0, input1, 0, gpuWriteBuffer1.size);

            addComputePass(device, commandEncoder, piplines[0], [buf_0, buf_1, input0, buf_2], [16, 64, 1]);
        addComputePass(device, commandEncoder, piplines[1], [buf_3, buf_0], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[2], [buf_4, buf_3], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[3], [buf_5, buf_3, buf_4, buf_6], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[4], [buf_7, buf_5, buf_8, buf_9], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[5], [buf_10, buf_5, buf_11, buf_12], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[6], [buf_13, buf_7, buf_14, buf_10, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[7], [buf_15, buf_5, buf_16, buf_17], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[8], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[9], [buf_19, buf_18, buf_13, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[10], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[11], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[12], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[13], [buf_15, buf_22, buf_13, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[14], [buf_18, buf_3, buf_15, buf_23, buf_24], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[15], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[16], [buf_15, buf_18, buf_4, buf_25], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[17], [buf_26, buf_15, buf_27, buf_28], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[18], [buf_29, buf_15, buf_30, buf_31, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[19], [buf_32, buf_18, buf_29, buf_33, buf_34], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[20], [buf_4, buf_32], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[21], [buf_35, buf_32, buf_4, buf_36], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[22], [buf_37, buf_35, buf_38, buf_39], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[23], [buf_40, buf_35, buf_41, buf_42], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[24], [buf_43, buf_37, buf_14, buf_40, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[25], [buf_18, buf_35, buf_44, buf_45], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[26], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[27], [buf_19, buf_15, buf_43, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[28], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[29], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[30], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[31], [buf_18, buf_22, buf_43, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[32], [buf_15, buf_32, buf_18, buf_46, buf_47], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[33], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[34], [buf_18, buf_15, buf_4, buf_48], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[35], [buf_26, buf_18, buf_49, buf_50], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[36], [buf_29, buf_18, buf_51, buf_52, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[37], [buf_53, buf_15, buf_29, buf_54, buf_55], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[38], [buf_4, buf_53], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[39], [buf_56, buf_53, buf_4, buf_57], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[40], [buf_58, buf_56, buf_59, buf_60], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[41], [buf_61, buf_56, buf_62, buf_63], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[42], [buf_64, buf_58, buf_14, buf_61, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[43], [buf_15, buf_56, buf_65, buf_66], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[44], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[45], [buf_19, buf_18, buf_64, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[46], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[47], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[48], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[49], [buf_15, buf_22, buf_64, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[50], [buf_18, buf_53, buf_15, buf_67, buf_68], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[51], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[52], [buf_15, buf_18, buf_4, buf_69], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[53], [buf_26, buf_15, buf_70, buf_71], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[54], [buf_29, buf_15, buf_72, buf_73, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[55], [buf_74, buf_18, buf_29, buf_75, buf_76], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[56], [buf_4, buf_74], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[57], [buf_77, buf_74, buf_4, buf_78], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[58], [buf_79, buf_77, buf_80, buf_81], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[59], [buf_82, buf_77, buf_83, buf_84], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[60], [buf_85, buf_79, buf_14, buf_82, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[61], [buf_18, buf_77, buf_86, buf_87], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[62], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[63], [buf_19, buf_15, buf_85, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[64], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[65], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[66], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[67], [buf_18, buf_22, buf_85, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[68], [buf_15, buf_74, buf_18, buf_88, buf_89], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[69], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[70], [buf_18, buf_15, buf_4, buf_90], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[71], [buf_26, buf_18, buf_91, buf_92], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[72], [buf_29, buf_18, buf_93, buf_94, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[73], [buf_95, buf_15, buf_29, buf_96, buf_97], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[74], [buf_4, buf_95], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[75], [buf_98, buf_95, buf_4, buf_99], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[76], [buf_100, buf_98, buf_101, buf_102], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[77], [buf_103, buf_98, buf_104, buf_105], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[78], [buf_106, buf_100, buf_14, buf_103, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[79], [buf_15, buf_98, buf_107, buf_108], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[80], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[81], [buf_19, buf_18, buf_106, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[82], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[83], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[84], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[85], [buf_15, buf_22, buf_106, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[86], [buf_18, buf_95, buf_15, buf_109, buf_110], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[87], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[88], [buf_15, buf_18, buf_4, buf_111], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[89], [buf_26, buf_15, buf_112, buf_113], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[90], [buf_29, buf_15, buf_114, buf_115, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[91], [buf_116, buf_18, buf_29, buf_117, buf_118], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[92], [buf_4, buf_116], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[93], [buf_119, buf_116, buf_4, buf_120], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[94], [buf_121, buf_119, buf_122, buf_123], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[95], [buf_124, buf_119, buf_125, buf_126], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[96], [buf_127, buf_121, buf_14, buf_124, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[97], [buf_18, buf_119, buf_128, buf_129], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[98], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[99], [buf_19, buf_15, buf_127, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[100], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[101], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[102], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[103], [buf_18, buf_22, buf_127, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[104], [buf_15, buf_116, buf_18, buf_130, buf_131], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[105], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[106], [buf_18, buf_15, buf_4, buf_132], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[107], [buf_26, buf_18, buf_133, buf_134], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[108], [buf_29, buf_18, buf_135, buf_136, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[109], [buf_137, buf_15, buf_29, buf_138, buf_139], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[110], [buf_4, buf_137], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[111], [buf_140, buf_137, buf_4, buf_141], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[112], [buf_142, buf_140, buf_143, buf_144], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[113], [buf_145, buf_140, buf_146, buf_147], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[114], [buf_148, buf_142, buf_14, buf_145, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[115], [buf_15, buf_140, buf_149, buf_150], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[116], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[117], [buf_19, buf_18, buf_148, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[118], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[119], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[120], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[121], [buf_15, buf_22, buf_148, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[122], [buf_18, buf_137, buf_15, buf_151, buf_152], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[123], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[124], [buf_15, buf_18, buf_4, buf_153], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[125], [buf_26, buf_15, buf_154, buf_155], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[126], [buf_29, buf_15, buf_156, buf_157, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[127], [buf_158, buf_18, buf_29, buf_159, buf_160], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[128], [buf_4, buf_158], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[129], [buf_161, buf_158, buf_4, buf_162], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[130], [buf_163, buf_161, buf_164, buf_165], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[131], [buf_166, buf_161, buf_167, buf_168], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[132], [buf_169, buf_163, buf_14, buf_166, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[133], [buf_18, buf_161, buf_170, buf_171], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[134], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[135], [buf_19, buf_15, buf_169, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[136], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[137], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[138], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[139], [buf_18, buf_22, buf_169, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[140], [buf_15, buf_158, buf_18, buf_172, buf_173], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[141], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[142], [buf_18, buf_15, buf_4, buf_174], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[143], [buf_26, buf_18, buf_175, buf_176], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[144], [buf_29, buf_18, buf_177, buf_178, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[145], [buf_179, buf_15, buf_29, buf_180, buf_181], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[146], [buf_4, buf_179], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[147], [buf_182, buf_179, buf_4, buf_183], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[148], [buf_184, buf_182, buf_185, buf_186], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[149], [buf_187, buf_182, buf_188, buf_189], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[150], [buf_190, buf_184, buf_14, buf_187, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[151], [buf_15, buf_182, buf_191, buf_192], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[152], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[153], [buf_19, buf_18, buf_190, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[154], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[155], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[156], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[157], [buf_15, buf_22, buf_190, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[158], [buf_18, buf_179, buf_15, buf_193, buf_194], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[159], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[160], [buf_15, buf_18, buf_4, buf_195], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[161], [buf_26, buf_15, buf_196, buf_197], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[162], [buf_29, buf_15, buf_198, buf_199, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[163], [buf_200, buf_18, buf_29, buf_201, buf_202], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[164], [buf_4, buf_200], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[165], [buf_203, buf_200, buf_4, buf_204], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[166], [buf_205, buf_203, buf_206, buf_207], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[167], [buf_208, buf_203, buf_209, buf_210], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[168], [buf_211, buf_205, buf_14, buf_208, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[169], [buf_18, buf_203, buf_212, buf_213], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[170], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[171], [buf_19, buf_15, buf_211, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[172], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[173], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[174], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[175], [buf_18, buf_22, buf_211, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[176], [buf_15, buf_200, buf_18, buf_214, buf_215], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[177], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[178], [buf_18, buf_15, buf_4, buf_216], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[179], [buf_26, buf_18, buf_217, buf_218], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[180], [buf_29, buf_18, buf_219, buf_220, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[181], [buf_221, buf_15, buf_29, buf_222, buf_223], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[182], [buf_4, buf_221], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[183], [buf_224, buf_221, buf_4, buf_225], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[184], [buf_226, buf_224, buf_227, buf_228], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[185], [buf_229, buf_224, buf_230, buf_231], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[186], [buf_232, buf_226, buf_14, buf_229, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[187], [buf_15, buf_224, buf_233, buf_234], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[188], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[189], [buf_19, buf_18, buf_232, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[190], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[191], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[192], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[193], [buf_15, buf_22, buf_232, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[194], [buf_18, buf_221, buf_15, buf_235, buf_236], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[195], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[196], [buf_15, buf_18, buf_4, buf_237], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[197], [buf_26, buf_15, buf_238, buf_239], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[198], [buf_29, buf_15, buf_240, buf_241, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[199], [buf_242, buf_18, buf_29, buf_243, buf_244], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[200], [buf_4, buf_242], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[201], [buf_245, buf_242, buf_4, buf_246], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[202], [buf_247, buf_245, buf_248, buf_249], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[203], [buf_250, buf_245, buf_251, buf_252], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[204], [buf_253, buf_247, buf_14, buf_250, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[205], [buf_18, buf_245, buf_254, buf_255], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[206], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[207], [buf_19, buf_15, buf_253, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[208], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[209], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[210], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[211], [buf_18, buf_22, buf_253, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[212], [buf_15, buf_242, buf_18, buf_256, buf_257], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[213], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[214], [buf_18, buf_15, buf_4, buf_258], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[215], [buf_26, buf_18, buf_259, buf_260], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[216], [buf_29, buf_18, buf_261, buf_262, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[217], [buf_263, buf_15, buf_29, buf_264, buf_265], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[218], [buf_4, buf_263], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[219], [buf_266, buf_263, buf_4, buf_267], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[220], [buf_268, buf_266, buf_269, buf_270], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[221], [buf_271, buf_266, buf_272, buf_273], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[222], [buf_274, buf_268, buf_14, buf_271, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[223], [buf_15, buf_266, buf_275, buf_276], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[224], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[225], [buf_19, buf_18, buf_274, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[226], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[227], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[228], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[229], [buf_15, buf_22, buf_274, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[230], [buf_18, buf_263, buf_15, buf_277, buf_278], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[231], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[232], [buf_15, buf_18, buf_4, buf_279], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[233], [buf_26, buf_15, buf_280, buf_281], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[234], [buf_29, buf_15, buf_282, buf_283, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[235], [buf_284, buf_18, buf_29, buf_285, buf_286], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[236], [buf_4, buf_284], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[237], [buf_287, buf_284, buf_4, buf_288], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[238], [buf_289, buf_287, buf_290, buf_291], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[239], [buf_292, buf_287, buf_293, buf_294], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[240], [buf_295, buf_289, buf_14, buf_292, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[241], [buf_18, buf_287, buf_296, buf_297], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[242], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[243], [buf_19, buf_15, buf_295, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[244], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[245], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[246], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[247], [buf_18, buf_22, buf_295, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[248], [buf_15, buf_284, buf_18, buf_298, buf_299], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[249], [buf_4, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[250], [buf_18, buf_15, buf_4, buf_300], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[251], [buf_26, buf_18, buf_301, buf_302], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[252], [buf_29, buf_18, buf_303, buf_304, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[253], [buf_305, buf_15, buf_29, buf_306, buf_307], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[254], [buf_4, buf_305], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[255], [buf_308, buf_305, buf_4, buf_309], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[256], [buf_310, buf_308, buf_311, buf_312], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[257], [buf_313, buf_308, buf_314, buf_315], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[258], [buf_316, buf_310, buf_14, buf_313, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[259], [buf_15, buf_308, buf_317, buf_318], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[260], [buf_18, buf_15, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[261], [buf_19, buf_18, buf_316, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[262], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[263], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[264], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[265], [buf_15, buf_22, buf_316, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[266], [buf_18, buf_305, buf_15, buf_319, buf_320], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[267], [buf_4, buf_18], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[268], [buf_15, buf_18, buf_4, buf_321], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[269], [buf_26, buf_15, buf_322, buf_323], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[270], [buf_29, buf_15, buf_324, buf_325, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[271], [buf_326, buf_18, buf_29, buf_327, buf_328], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[272], [buf_4, buf_326], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[273], [buf_329, buf_326, buf_4, buf_330], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[274], [buf_331, buf_329, buf_332, buf_333], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[275], [buf_334, buf_329, buf_335, buf_336], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[276], [buf_337, buf_331, buf_14, buf_334, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[277], [buf_338, buf_339, buf_340], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[278], [buf_18, buf_329, buf_341, buf_342], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[279], [buf_4, buf_339, buf_340], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[280], [buf_15, buf_18, buf_14, input1], [2, 1, 1]);
        addComputePass(device, commandEncoder, piplines[281], [buf_19, buf_15, buf_337, input1], [data1[0] + 1, 2, 1]);
        addComputePass(device, commandEncoder, piplines[282], [buf_20, buf_19, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[283], [buf_21, buf_19, buf_20, input1], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[284], [buf_22, buf_19, buf_20, buf_21, input1], [data1[0] + 1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[285], [buf_18, buf_22, buf_337, input1], [4, 1, 1]);
        addComputePass(device, commandEncoder, piplines[286], [buf_15, buf_326, buf_18, buf_343, buf_344], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[287], [buf_345, buf_15], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[288], [buf_18, buf_15, buf_345, buf_346], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[289], [buf_26, buf_18, buf_347, buf_348], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[290], [buf_29, buf_18, buf_349, buf_350, buf_26], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[291], [buf_351, buf_15, buf_29, buf_352, buf_353], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[292], [buf_345, buf_351], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[293], [buf_15, buf_351, buf_345, buf_354], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[294], [buf_355, buf_15, buf_356], [8016, 1, 1]);
        addComputePass(device, commandEncoder, piplines[295], [buf_357, buf_355], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[296], [buf_345, buf_357], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[297], [buf_357, buf_355, buf_345], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[298], [buf_358, buf_357], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[299], [buf_359, buf_355, buf_345, buf_358], [1336, 1, 1]);
        addComputePass(device, commandEncoder, piplines[300], [buf_360, buf_359], [16, 167, 1]);
        addComputePass(device, commandEncoder, piplines[301], [buf_361, buf_360], [167, 1, 1]);
        addComputePass(device, commandEncoder, piplines[302], [buf_362, buf_4, buf_360, buf_361], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[303], [output0, buf_362], [1, 1, 1]);
            commandEncoder.copyBufferToBuffer(output0, 0, gpuReadBuffer, 0, output0.size);
            const gpuCommands = commandEncoder.finish();
            device.queue.submit([gpuCommands]);

            await gpuReadBuffer.mapAsync(GPUMapMode.READ);
            const resultBuffer = new Int32Array(gpuReadBuffer.size/4);
            resultBuffer.set(new Int32Array(gpuReadBuffer.getMappedRange()));
            gpuReadBuffer.unmap();
            return resultBuffer;
        }
      }
    }
  }
  
    var q6k_to_f32 = function() {

    const E_156_32_3 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<atomic<u32>>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 156 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = ((gidx0*20160)+(lidx0*630));
  var alu1 = (alu0+208);
  var alu2 = (alu0+209);
  var alu3 = (alu0+418);
  var alu4 = (alu0+419);
  var alu5 = (alu0+628);
  var alu6 = (alu0+629);
  var val0 = atomicLoad(&data1[(alu1>>2)]);
  var val1 = atomicLoad(&data1[(alu2>>2)]);
  var val2 = atomicLoad(&data1[(alu3>>2)]);
  var val3 = atomicLoad(&data1[(alu4>>2)]);
  var val4 = atomicLoad(&data1[(alu5>>2)]);
  var val5 = atomicLoad(&data1[(alu6>>2)]);
  var alu7 = ((gidx0*96)+(lidx0*3));
  var alu8 = ((u32((u32(((val0>>(((u32(alu1))&3u)<<3u))&255u)))))+((u32((u32(((val1>>(((u32(alu2))&3u)<<3u))&255u)))))<<8u));
  var cast0 = (f32((alu8&1023u)));
  var alu9 = (alu8&65535u);
  var alu10 = ((u32((u32(((val2>>(((u32(alu3))&3u)<<3u))&255u)))))+((u32((u32(((val3>>(((u32(alu4))&3u)<<3u))&255u)))))<<8u));
  var cast1 = (f32((alu10&1023u)));
  var alu11 = (alu10&65535u);
  var alu12 = ((u32((u32(((val4>>(((u32(alu5))&3u)<<3u))&255u)))))+((u32((u32(((val5>>(((u32(alu6))&3u)<<3u))&255u)))))<<8u));
  var cast2 = (f32((alu12&1023u)));
  var alu13 = (alu12&65535u);
  var cast3 = (f32(((alu9>>10u)&31u)));
  var cast4 = (f32(((alu11>>10u)&31u)));
  var cast5 = (f32(((alu13>>10u)&31u)));
  data0[alu7] = (select((cast0*5.960464477539063e-08f),(exp2((cast3+-15.0f))*((cast0*0.0009765625f)+1.0f)),(bool(cast3)))*select(1.0f,-1.0f,(bool((f32(((alu9>>15u)&1u)))))));
  data0[(alu7+1)] = (select((cast1*5.960464477539063e-08f),(exp2((cast4+-15.0f))*((cast1*0.0009765625f)+1.0f)),(bool(cast4)))*select(1.0f,-1.0f,(bool((f32(((alu11>>15u)&1u)))))));
  data0[(alu7+2)] = (select((cast2*5.960464477539063e-08f),(exp2((cast5+-15.0f))*((cast2*0.0009765625f)+1.0f)),(bool(cast5)))*select(1.0f,-1.0f,(bool((f32(((alu13>>15u)&1u)))))));
}`;

const E_156_32_3n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<atomic<u32>>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 156 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = ((gidx0*20160)+(lidx0*630));
  var alu1 = (alu0+208);
  var alu2 = (alu0+209);
  var alu3 = (alu0+418);
  var alu4 = (alu0+419);
  var alu5 = (alu0+628);
  var alu6 = (alu0+629);
  var val0 = atomicLoad(&data1[(alu1>>2)]);
  var val1 = atomicLoad(&data1[(alu2>>2)]);
  var val2 = atomicLoad(&data1[(alu3>>2)]);
  var val3 = atomicLoad(&data1[(alu4>>2)]);
  var val4 = atomicLoad(&data1[(alu5>>2)]);
  var val5 = atomicLoad(&data1[(alu6>>2)]);
  var alu7 = ((gidx0*96)+(lidx0*3));
  var alu8 = ((u32((u32(((val0>>(((u32(alu1))&3u)<<3u))&255u)))))+((u32((u32(((val1>>(((u32(alu2))&3u)<<3u))&255u)))))<<8u));
  var alu9 = ((u32((u32(((val2>>(((u32(alu3))&3u)<<3u))&255u)))))+((u32((u32(((val3>>(((u32(alu4))&3u)<<3u))&255u)))))<<8u));
  var alu10 = ((u32((u32(((val4>>(((u32(alu5))&3u)<<3u))&255u)))))+((u32((u32(((val5>>(((u32(alu6))&3u)<<3u))&255u)))))<<8u));
  var cast0 = (f32(((alu8>>16u)&1023u)));
  var cast1 = (f32(((alu8>>26u)&31u)));
  var cast2 = (f32(((alu9>>16u)&1023u)));
  var cast3 = (f32(((alu9>>26u)&31u)));
  var cast4 = (f32(((alu10>>16u)&1023u)));
  var cast5 = (f32(((alu10>>26u)&31u)));
  data0[alu7] = (select((cast0*5.960464477539063e-08f),(exp2((cast1+-15.0f))*((cast0*0.0009765625f)+1.0f)),(bool(cast1)))*select(1.0f,-1.0f,(bool((f32(((alu8>>31u)&1u)))))));
  data0[(alu7+1)] = (select((cast2*5.960464477539063e-08f),(exp2((cast3+-15.0f))*((cast2*0.0009765625f)+1.0f)),(bool(cast3)))*select(1.0f,-1.0f,(bool((f32(((alu9>>31u)&1u)))))));
  data0[(alu7+2)] = (select((cast4*5.960464477539063e-08f),(exp2((cast5+-15.0f))*((cast4*0.0009765625f)+1.0f)),(bool(cast5)))*select(1.0f,-1.0f,(bool((f32(((alu10>>31u)&1u)))))));
}`;

const E_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<atomic<u32>>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = atomicLoad(&data0[0]);
  atomicAnd(&data0[0],4294902015u);
  atomicAdd(&data0[0],4096u);
  atomicAnd(&data0[0],4294967040u);
  atomicAdd(&data0[0],1u);
}`;

const E_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<atomic<u32>>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = atomicLoad(&data0[0]);
  atomicAnd(&data0[0],16777215u);
  atomicAdd(&data0[0],1073741824u);
  atomicAnd(&data0[0],4278255615u);
  atomicAdd(&data0[0],1048576u);
  atomicAnd(&data0[0],4294902015u);
  atomicAdd(&data0[0],1024u);
  atomicAnd(&data0[0],4294967040u);
  atomicAdd(&data0[0],1u);
}`;

const E_468_32_4_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<atomic<u32>>;
@group(0) @binding(1)var<storage,read_write>data1:array<atomic<u32>>;
@compute @workgroup_size(32,4) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 468 */
  var lidx0 = i32(lindex.x); /* 32 */
  var lidx1 = i32(lindex.y); /* 4 */
  var alu0 = (lidx1<<2);
  var alu1 = ((gidx0*6720)+(lidx0*210)+alu0);
  var alu2 = (alu1+192);
  var alu3 = (alu1+193);
  var alu4 = (alu1+194);
  var alu5 = (alu1+195);
  var alu6 = ((gidx0<<9)+(lidx0<<4)+alu0);
  var alu7 = (alu6+1);
  var alu8 = (alu6+2);
  var alu9 = (alu6+3);
  var val0 = atomicLoad(&data1[(alu2>>2)]);
  var val1 = atomicLoad(&data1[(alu3>>2)]);
  var val2 = atomicLoad(&data1[(alu4>>2)]);
  var val3 = atomicLoad(&data1[(alu5>>2)]);
  var val4 = atomicLoad(&data0[(alu7>>2)]);
  var val5 = atomicLoad(&data0[(alu8>>2)]);
  var val6 = atomicLoad(&data0[(alu9>>2)]);
  var val7 = atomicLoad(&data0[(alu6>>2)]);
  var alu10 = (((u32(alu7))&3u)<<3u);
  var alu11 = (((u32(alu8))&3u)<<3u);
  var alu12 = (((u32(alu9))&3u)<<3u);
  var alu13 = (((u32(alu6))&3u)<<3u);
  var precast0 = (u32(((val0>>(((u32(alu2))&3u)<<3u))&255u)));
  atomicAnd(&data0[(alu6>>2)],((255u<<alu13)^4294967295u));
  atomicAdd(&data0[(alu6>>2)],((u32((bitcast<i32>(precast0&0xFF)&(i32(255)))))<<alu13));
  var precast1 = (u32(((val1>>(((u32(alu3))&3u)<<3u))&255u)));
  atomicAnd(&data0[(alu7>>2)],((255u<<alu10)^4294967295u));
  atomicAdd(&data0[(alu7>>2)],((u32((bitcast<i32>(precast1&0xFF)&(i32(255)))))<<alu10));
  var precast2 = (u32(((val2>>(((u32(alu4))&3u)<<3u))&255u)));
  atomicAnd(&data0[(alu8>>2)],((255u<<alu11)^4294967295u));
  atomicAdd(&data0[(alu8>>2)],((u32((bitcast<i32>(precast2&0xFF)&(i32(255)))))<<alu11));
  var precast3 = (u32(((val3>>(((u32(alu5))&3u)<<3u))&255u)));
  atomicAnd(&data0[(alu9>>2)],((255u<<alu12)^4294967295u));
  atomicAdd(&data0[(alu9>>2)],((u32((bitcast<i32>(precast3&0xFF)&(i32(255)))))<<alu12));
}`;

const E_468_32_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 468 */
  var lidx0 = i32(lindex.x); /* 32 */
  var alu0 = (lidx0+(gidx0<<5));
  var val0 = data1[alu0];
  var val1 = data2[alu0];
  var alu1 = ((gidx0<<6)+(lidx0<<1));
  data0[alu1] = val0;
  data0[(alu1+1)] = val1;
}`;

const E_1872_4_8_16_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data4:array<atomic<u32>>;
@group(0) @binding(5)var<storage,read_write>data5:array<atomic<u32>>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 4 */
  var gidx1 = i32(gindex.y); /* 1872 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = ((gidx1*1680)+(lidx0*210));
  var val0 = data1[((gidx1<<4)+(lidx0<<1))];
  var alu1 = (lidx1<<2);
  var alu2 = (gidx0>>1);
  var alu3 = (alu0+(alu2<<6)+alu1);
  var alu4 = (alu3+1);
  var alu5 = (alu3+2);
  var alu6 = (alu3+3);
  var alu7 = ((gidx0<<2)+(gidx1<<7)+(lidx0<<4)+(lidx1>>2));
  var val1 = atomicLoad(&data2[(alu4>>2)]);
  var val2 = atomicLoad(&data2[(alu5>>2)]);
  var val3 = atomicLoad(&data2[(alu6>>2)]);
  var val4 = atomicLoad(&data2[(alu3>>2)]);
  var val5 = atomicLoad(&data5[(alu7>>2)]);
  var alu8 = (gidx0&1);
  var val6 = atomicLoad(&data3[(alu8>>2)]);
  var alu9 = (alu0+(alu2<<5)+((lidx1&7)<<2));
  var alu10 = (alu9+128);
  var alu11 = (alu9+129);
  var alu12 = (alu9+130);
  var alu13 = (alu9+131);
  var val7 = atomicLoad(&data2[(alu10>>2)]);
  var val8 = atomicLoad(&data2[(alu11>>2)]);
  var val9 = atomicLoad(&data2[(alu12>>2)]);
  var val10 = atomicLoad(&data2[(alu13>>2)]);
  var alu14 = (((gidx0<<1)+(lidx1>>3))&3);
  var val11 = atomicLoad(&data4[(alu14>>2)]);
  var alu15 = ((gidx0<<6)+(gidx1<<11)+(lidx0<<8)+alu1);
  var alu16 = ((val5>>(((u32(alu7))&3u)<<3u))&255u);
  var precast0 = alu16;
  var cast0 = (u32(((val11>>(((u32(alu14))&3u)<<3u))&255u)));
  var cast1 = (u32(((val6>>(((u32(alu8))&3u)<<3u))&255u)));
  var precast1 = (((((u32(((val8>>(((u32(alu11))&3u)<<3u))&255u)))/cast0)&3u)<<4u)|(((u32(((val1>>(((u32(alu4))&3u)<<3u))&255u)))/cast1)&15u));
  var precast2 = (((((u32(((val9>>(((u32(alu12))&3u)<<3u))&255u)))/cast0)&3u)<<4u)|(((u32(((val2>>(((u32(alu5))&3u)<<3u))&255u)))/cast1)&15u));
  var precast3 = (((((u32(((val10>>(((u32(alu13))&3u)<<3u))&255u)))/cast0)&3u)<<4u)|(((u32(((val3>>(((u32(alu6))&3u)<<3u))&255u)))/cast1)&15u));
  var precast4 = (((((u32(((val7>>(((u32(alu10))&3u)<<3u))&255u)))/cast0)&3u)<<4u)|(((u32(((val4>>(((u32(alu3))&3u)<<3u))&255u)))/cast1)&15u));
  var precast5 = (select(0u,4294967040u,(0u<(alu16>>7u)))|bitcast<u32>(precast0));
  var cast2 = (f32((i32(bitcast<i32>(precast5)))));
  data0[alu15] = (cast2*(f32((bitcast<i32>(precast4&0xFF)+(i32(-32)))))*val0);
  data0[(alu15+1)] = (cast2*(f32((bitcast<i32>(precast1&0xFF)+(i32(-32)))))*val0);
  data0[(alu15+2)] = (cast2*(f32((bitcast<i32>(precast2&0xFF)+(i32(-32)))))*val0);
  data0[(alu15+3)] = (cast2*(f32((bitcast<i32>(precast3&0xFF)+(i32(-32)))))*val0);
}`;

    return {
      "setup": async (device, state_dict) => {

        const buf_0 = createEmptyBuf(device, 59904);
   const input0 = createEmptyBuf(device, 3144960);
   const buf_1 = createEmptyBuf(device, 59904);
   //const buf_2 = createEmptyBuf(device, 2);
   const buf_2 = createEmptyBuf(device, 4);
   const buf_3 = createEmptyBuf(device, 4);
   const buf_4 = createEmptyBuf(device, 239616);
   const buf_5 = createEmptyBuf(device, 119808);
   const output0 = createEmptyBuf(device, 15335424);

        const gpuWriteBuffer0 = device.createBuffer({size:input0.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });
        const gpuReadBuffer = device.createBuffer({ size: output0.size, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });

        const kernels = [E_156_32_3, E_156_32_3n1, E_2, E_4, E_468_32_4_4, E_468_32_2, E_1872_4_8_16_4];
        const piplines = await Promise.all(kernels.map(name => device.createComputePipelineAsync({layout: "auto", compute: { module: device.createShaderModule({ code: name }), entryPoint: "main" }})));

        return async (data0) => {
            const commandEncoder = device.createCommandEncoder();

            await gpuWriteBuffer0.mapAsync(GPUMapMode.WRITE);
    new Uint8Array(gpuWriteBuffer0.getMappedRange()).set(data0);
    gpuWriteBuffer0.unmap();
commandEncoder.copyBufferToBuffer(gpuWriteBuffer0, 0, input0, 0, gpuWriteBuffer0.size);

            addComputePass(device, commandEncoder, piplines[0], [buf_0, input0], [156, 1, 1]);
        addComputePass(device, commandEncoder, piplines[1], [buf_1, input0], [156, 1, 1]);
        addComputePass(device, commandEncoder, piplines[2], [buf_2], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[3], [buf_3], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[4], [buf_4, input0], [468, 1, 1]);
        addComputePass(device, commandEncoder, piplines[5], [buf_5, buf_0, buf_1], [468, 1, 1]);
        addComputePass(device, commandEncoder, piplines[6], [output0, buf_5, input0, buf_2, buf_3, buf_4], [4, 1872, 1]);
            commandEncoder.copyBufferToBuffer(output0, 0, gpuReadBuffer, 0, output0.size);
            const gpuCommands = commandEncoder.finish();
            device.queue.submit([gpuCommands]);

            await gpuReadBuffer.mapAsync(GPUMapMode.READ);
            const resultBuffer = new Float32Array(gpuReadBuffer.size/4);
            resultBuffer.set(new Float32Array(gpuReadBuffer.getMappedRange()));
            gpuReadBuffer.unmap();
            return resultBuffer;
        }
      }
    }
  }
  