
  const createEmptyBuf = (device, size) => {
      return device.createBuffer({size, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST });
  };
  const createUniformBuf = (device, size) => {
    return device.createBuffer({size, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST})
  }

  const createWeightBuf = (device, size, data) => {
    const buf = device.createBuffer({ size, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST })
    data.bytes = buf;
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

    const r_4_256_32_501_4_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<i32>;
@group(0) @binding(2)var<storage,read_write>data2:array<i32>;
@group(0) @binding(3)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 256 */
  var gidx1 = i32(gindex.y); /* 4 */
  var lidx0 = i32(lindex.x); /* 32 */
  var val0 = data2[0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  var acc4 = 0.0f;
  var acc5 = 0.0f;
  var acc6 = 0.0f;
  var acc7 = 0.0f;
  var acc8 = 0.0f;
  var acc9 = 0.0f;
  var acc10 = 0.0f;
  var acc11 = 0.0f;
  var acc12 = 0.0f;
  var acc13 = 0.0f;
  var acc14 = 0.0f;
  var acc15 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var alu0 = ((gidx0*501)+ridx0);
    var val1 = data1[alu0];
    var val2 = data4[alu0];
    var alu1 = (lidx0+(gidx0*1026048)+(gidx1<<9)+(ridx0<<11));
    var alu2 = (alu1+32);
    var alu3 = (alu1+64);
    var alu4 = (alu1+96);
    var alu5 = (alu1+128);
    var alu6 = (alu1+160);
    var alu7 = (alu1+192);
    var alu8 = (alu1+224);
    var alu9 = (alu1+256);
    var alu10 = (alu1+288);
    var alu11 = (alu1+320);
    var alu12 = (alu1+352);
    var alu13 = (alu1+384);
    var alu14 = (alu1+416);
    var alu15 = (alu1+448);
    var alu16 = (alu1+480);
    var val3 = atomicLoad(&data3[(alu1>>2)]);
    var val4 = atomicLoad(&data3[(alu2>>2)]);
    var val5 = atomicLoad(&data3[(alu3>>2)]);
    var val6 = atomicLoad(&data3[(alu4>>2)]);
    var val7 = atomicLoad(&data3[(alu5>>2)]);
    var val8 = atomicLoad(&data3[(alu6>>2)]);
    var val9 = atomicLoad(&data3[(alu7>>2)]);
    var val10 = atomicLoad(&data3[(alu8>>2)]);
    var val11 = atomicLoad(&data3[(alu9>>2)]);
    var val12 = atomicLoad(&data3[(alu10>>2)]);
    var val13 = atomicLoad(&data3[(alu11>>2)]);
    var val14 = atomicLoad(&data3[(alu12>>2)]);
    var val15 = atomicLoad(&data3[(alu13>>2)]);
    var val16 = atomicLoad(&data3[(alu14>>2)]);
    var val17 = atomicLoad(&data3[(alu15>>2)]);
    var val18 = atomicLoad(&data3[(alu16>>2)]);
    var cast0 = (f32(((val1!=val0)!=true)));
    var alu17 = ((val3>>(((u32(alu1))&3u)<<3u))&255u);
    var precast0 = alu17;
    var alu18 = ((val4>>(((u32(alu2))&3u)<<3u))&255u);
    var precast1 = alu18;
    var alu19 = ((val5>>(((u32(alu3))&3u)<<3u))&255u);
    var precast2 = alu19;
    var alu20 = ((val6>>(((u32(alu4))&3u)<<3u))&255u);
    var precast3 = alu20;
    var alu21 = ((val7>>(((u32(alu5))&3u)<<3u))&255u);
    var precast4 = alu21;
    var alu22 = ((val8>>(((u32(alu6))&3u)<<3u))&255u);
    var precast5 = alu22;
    var alu23 = ((val9>>(((u32(alu7))&3u)<<3u))&255u);
    var precast6 = alu23;
    var alu24 = ((val10>>(((u32(alu8))&3u)<<3u))&255u);
    var precast7 = alu24;
    var alu25 = ((val11>>(((u32(alu9))&3u)<<3u))&255u);
    var precast8 = alu25;
    var alu26 = ((val12>>(((u32(alu10))&3u)<<3u))&255u);
    var precast9 = alu26;
    var alu27 = ((val13>>(((u32(alu11))&3u)<<3u))&255u);
    var precast10 = alu27;
    var alu28 = ((val14>>(((u32(alu12))&3u)<<3u))&255u);
    var precast11 = alu28;
    var alu29 = ((val15>>(((u32(alu13))&3u)<<3u))&255u);
    var precast12 = alu29;
    var alu30 = ((val16>>(((u32(alu14))&3u)<<3u))&255u);
    var precast13 = alu30;
    var alu31 = ((val17>>(((u32(alu15))&3u)<<3u))&255u);
    var precast14 = alu31;
    var alu32 = ((val18>>(((u32(alu16))&3u)<<3u))&255u);
    var precast15 = alu32;
    var precast16 = (select(0u,4294967040u,(0u<(alu17>>7u)))|bitcast<u32>(precast0));
    var precast17 = (select(0u,4294967040u,(0u<(alu18>>7u)))|bitcast<u32>(precast1));
    var precast18 = (select(0u,4294967040u,(0u<(alu19>>7u)))|bitcast<u32>(precast2));
    var precast19 = (select(0u,4294967040u,(0u<(alu20>>7u)))|bitcast<u32>(precast3));
    var precast20 = (select(0u,4294967040u,(0u<(alu21>>7u)))|bitcast<u32>(precast4));
    var precast21 = (select(0u,4294967040u,(0u<(alu22>>7u)))|bitcast<u32>(precast5));
    var precast22 = (select(0u,4294967040u,(0u<(alu23>>7u)))|bitcast<u32>(precast6));
    var precast23 = (select(0u,4294967040u,(0u<(alu24>>7u)))|bitcast<u32>(precast7));
    var precast24 = (select(0u,4294967040u,(0u<(alu25>>7u)))|bitcast<u32>(precast8));
    var precast25 = (select(0u,4294967040u,(0u<(alu26>>7u)))|bitcast<u32>(precast9));
    var precast26 = (select(0u,4294967040u,(0u<(alu27>>7u)))|bitcast<u32>(precast10));
    var precast27 = (select(0u,4294967040u,(0u<(alu28>>7u)))|bitcast<u32>(precast11));
    var precast28 = (select(0u,4294967040u,(0u<(alu29>>7u)))|bitcast<u32>(precast12));
    var precast29 = (select(0u,4294967040u,(0u<(alu30>>7u)))|bitcast<u32>(precast13));
    var precast30 = (select(0u,4294967040u,(0u<(alu31>>7u)))|bitcast<u32>(precast14));
    var precast31 = (select(0u,4294967040u,(0u<(alu32>>7u)))|bitcast<u32>(precast15));
    acc0 = (acc0+(cast0*(f32((i32(bitcast<i32>(precast16)))))*val2));
    acc1 = (acc1+(cast0*(f32((i32(bitcast<i32>(precast20)))))*val2));
    acc2 = (acc2+(cast0*(f32((i32(bitcast<i32>(precast24)))))*val2));
    acc3 = (acc3+(cast0*(f32((i32(bitcast<i32>(precast28)))))*val2));
    acc4 = (acc4+(cast0*(f32((i32(bitcast<i32>(precast17)))))*val2));
    acc5 = (acc5+(cast0*(f32((i32(bitcast<i32>(precast21)))))*val2));
    acc6 = (acc6+(cast0*(f32((i32(bitcast<i32>(precast25)))))*val2));
    acc7 = (acc7+(cast0*(f32((i32(bitcast<i32>(precast29)))))*val2));
    acc8 = (acc8+(cast0*(f32((i32(bitcast<i32>(precast18)))))*val2));
    acc9 = (acc9+(cast0*(f32((i32(bitcast<i32>(precast22)))))*val2));
    acc10 = (acc10+(cast0*(f32((i32(bitcast<i32>(precast26)))))*val2));
    acc11 = (acc11+(cast0*(f32((i32(bitcast<i32>(precast30)))))*val2));
    acc12 = (acc12+(cast0*(f32((i32(bitcast<i32>(precast19)))))*val2));
    acc13 = (acc13+(cast0*(f32((i32(bitcast<i32>(precast23)))))*val2));
    acc14 = (acc14+(cast0*(f32((i32(bitcast<i32>(precast27)))))*val2));
    acc15 = (acc15+(cast0*(f32((i32(bitcast<i32>(precast31)))))*val2));
  }
  var alu50 = (gidx0+(gidx1<<17)+(lidx0<<8));
  data0[alu50] = acc0;
  data0[(alu50+8192)] = acc4;
  data0[(alu50+16384)] = acc8;
  data0[(alu50+24576)] = acc12;
  data0[(alu50+32768)] = acc1;
  data0[(alu50+40960)] = acc5;
  data0[(alu50+49152)] = acc9;
  data0[(alu50+57344)] = acc13;
  data0[(alu50+65536)] = acc2;
  data0[(alu50+73728)] = acc6;
  data0[(alu50+81920)] = acc10;
  data0[(alu50+90112)] = acc14;
  data0[(alu50+98304)] = acc3;
  data0[(alu50+106496)] = acc7;
  data0[(alu50+114688)] = acc11;
  data0[(alu50+122880)] = acc15;
}`;

const r_512_256_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 512 */
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 256; ridx0++) {
    var alu0 = ((gidx0<<10)+ridx0);
    var val0 = data1[alu0];
    var val1 = data1[(alu0+256)];
    var val2 = data1[(alu0+512)];
    var val3 = data1[(alu0+768)];
    acc0 = (acc0+val0);
    acc1 = (acc1+val1);
    acc2 = (acc2+val2);
    acc3 = (acc3+val3);
  }
  var alu6 = (gidx0<<2);
  data0[alu6] = acc0;
  data0[(alu6+1)] = acc1;
  data0[(alu6+2)] = acc2;
  data0[(alu6+3)] = acc3;
}`;

const r_16_128 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 16 */
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var val0 = data1[((lidx0<<7)+ridx0)];
    acc0 = (acc0+(val0*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val1 = temp0[ridx1];
      acc1 = (acc1+val1);
    }
    data0[0] = sqrt((1/((acc1*0.00048828125f)+1e-05f)));
  }
}`;

const E_1024_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 1024 */
  var val0 = data2[0];
  var alu0 = (gidx0<<1);
  var val1 = data1[alu0];
  var val2 = data3[alu0];
  var alu1 = (alu0+1);
  var val3 = data1[alu1];
  var val4 = data3[alu1];
  data0[alu1] = (val4*val0*val3);
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
  var val0 = data3[gidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var alu0 = (ridx0<<4);
    var val1 = data1[(lidx0+alu0)];
    var alu1 = (lidx0+(gidx0<<11)+alu0);
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

const E_8_64_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64 */
  var gidx1 = i32(gindex.y); /* 8 */
  var alu0 = (gidx1<<6);
  var val0 = data3[(gidx0+alu0)];
  var alu1 = ((gidx0>>1)<<1);
  var alu2 = ((start_pos<<6)+alu1);
  var alu3 = (alu0+alu1);
  var alu4 = ((gidx0&1)<1);
  var val1 = select(0.0f, data2[alu2], alu4);
  var val2 = select(0.0f, data1[(alu3+1)], alu4);
  var val3 = select(0.0f, data1[alu3], alu4);
  var val4 = select(0.0f, data2[(alu2+1)], alu4);
  var alu5 = (alu4!=true);
  var val5 = select(0.0f, data2[(alu2+1)], alu5);
  var val6 = select(0.0f, data1[(alu3+1)], alu5);
  var val7 = select(0.0f, data1[alu3], alu5);
  var val8 = select(0.0f, data2[alu2], alu5);
  var alu6 = (gidx0+(start_pos<<9)+alu0);
  data0[(alu6+524288)] = val0;
  data0[alu6] = ((val6*val8)+(val7*val5)+(val3*val1)+(val2*val4*select(0.0f,-1.0f,alu4)));
}`;

const r_2048_8_16_16 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 128>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var val0 = data3[gidx0];
  var alu0 = (lidx1<<7);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 16; ridx0++) {
    var alu1 = (ridx0<<3);
    var val1 = data1[(lidx0+alu0+alu1)];
    var alu2 = (lidx0+(gidx0<<11)+alu0+alu1);
    var val2 = atomicLoad(&data2[(alu2>>2)]);
    var alu3 = ((val2>>(((u32(alu2))&3u)<<3u))&255u);
    var precast0 = alu3;
    var precast1 = (select(0u,4294967040u,(0u<(alu3>>7u)))|bitcast<u32>(precast0));
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast1)))))*val0));
  }
  temp0[(lidx1+(lidx0<<4))] = acc0;
  workgroupBarrier();
  if ((((bool(lidx0))!=true)&((bool(lidx1))!=true))) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 8; ridx1++) {
      for (var ridx2 = 0; ridx2 < 16; ridx2++) {
        var val3 = temp0[((ridx1<<4)+ridx2)];
        acc1 = (acc1+val3);
      }
    }
    data0[gidx0] = acc1;
  }
}`;

const E_32_32_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32 */
  var gidx1 = i32(gindex.y); /* 32 */
  var alu0 = (gidx0<<1);
  var alu1 = ((start_pos<<6)+alu0);
  var val0 = data2[alu1];
  var val1 = data2[(alu1+1)];
  var alu2 = (alu0+(gidx1<<6));
  var val2 = data1[alu2];
  var alu3 = (alu2+1);
  var val3 = data1[alu3];
  data0[alu3] = ((val3*val0)+(val2*val1));
  data0[alu2] = ((val2*val0)-(val3*val1));
}`;

const r_32_28start_pos2B129_8_8 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 8>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(8) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* UOp(Ops.ADD, dtypes.int, arg=None, src=(
  UOp(Ops.DEFINE_VAR, dtypes.int, arg=('start_pos', 0, 1024), src=()),
  UOp(Ops.CONST, dtypes.int, arg=1, src=()),)) */
  var gidx1 = i32(gindex.y); /* 32 */
  var lidx0 = i32(lindex.x); /* 8 */
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 8; ridx0++) {
    var alu0 = (ridx0<<3);
    var val0 = data1[(lidx0+(gidx1<<6)+alu0)];
    var val1 = data2[(lidx0+alu0+((((gidx0<<3)+(gidx1>>2))%((start_pos<<3)+8))<<6))];
    acc0 = (acc0+(val0*val1));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 8; ridx1++) {
      var val2 = temp0[ridx1];
      acc1 = (acc1+val2);
    }
    data0[(gidx0+(gidx1*(start_pos+1)))] = (acc1*0.125f);
  }
}`;

const r_8_28start_pos2B129_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8 */
  var acc0 = (f32(-inf(1.0)));
  var acc1 = (f32(-inf(1.0)));
  var acc2 = (f32(-inf(1.0)));
  var acc3 = (f32(-inf(1.0)));
  for (var ridx0 = 0; ridx0 < (start_pos+1); ridx0++) {
    var alu0 = ((gidx0*((start_pos<<2)+4))+ridx0);
    var val0 = data1[alu0];
    var val1 = data1[(start_pos+alu0+1)];
    var val2 = data1[(alu0+(start_pos*3)+3)];
    var val3 = data1[(alu0+(start_pos<<1)+2)];
    acc0 = select(acc0,val0,(acc0<val0));
    acc1 = select(acc1,val1,(acc1<val1));
    acc2 = select(acc2,val3,(acc2<val3));
    acc3 = select(acc3,val2,(acc3<val2));
  }
  var alu6 = (gidx0<<2);
  data0[alu6] = acc0;
  data0[(alu6+1)] = acc1;
  data0[(alu6+2)] = acc2;
  data0[(alu6+3)] = acc3;
}`;

const r_16_28start_pos2B129_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16 */
  var alu0 = (gidx0<<1);
  var alu1 = (alu0+1);
  var val0 = data2[alu1];
  var val1 = data2[alu0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  for (var ridx0 = 0; ridx0 < (start_pos+1); ridx0++) {
    var alu2 = ((gidx0*((start_pos<<1)+2))+ridx0);
    var val2 = data1[alu2];
    var val3 = data1[(start_pos+alu2+1)];
    acc0 = (acc0+exp2(((val2-val1)*1.4426950408889634f)));
    acc1 = (acc1+exp2(((val3-val0)*1.4426950408889634f)));
  }
  data0[alu1] = acc1;
  data0[alu0] = acc0;
}`;

const E_16_28start_pos2B129_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* UOp(Ops.ADD, dtypes.int, arg=None, src=(
  UOp(Ops.DEFINE_VAR, dtypes.int, arg=('start_pos', 0, 1024), src=()),
  UOp(Ops.CONST, dtypes.int, arg=1, src=()),)) */
  var gidx1 = i32(gindex.y); /* 16 */
  var alu0 = (gidx0+(gidx1*((start_pos<<1)+2)));
  var val0 = data1[alu0];
  var alu1 = (start_pos+alu0+1);
  var val1 = data1[alu1];
  var alu2 = (gidx1<<1);
  var val2 = data2[alu2];
  var val3 = data3[alu2];
  var alu3 = (alu2+1);
  var val4 = data2[alu3];
  var val5 = data3[alu3];
  data0[alu0] = (exp2(((val0-val2)*1.4426950408889634f))*(1/val3));
  data0[alu1] = (exp2(((val1-val4)*1.4426950408889634f))*(1/val5));
}`;

const r_16_64_28start_pos2B129_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64 */
  var gidx1 = i32(gindex.y); /* 16 */
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  for (var ridx0 = 0; ridx0 < (start_pos+1); ridx0++) {
    var alu0 = ((gidx1*((start_pos<<1)+2))+ridx0);
    var val0 = data1[alu0];
    var val1 = data1[(start_pos+alu0+1)];
    var val2 = data2[(gidx0+((((ridx0<<3)+(gidx1>>1))%((start_pos<<3)+8))<<6)+524288)];
    acc0 = (acc0+(val2*val0));
    acc1 = (acc1+(val2*val1));
  }
  var alu4 = (gidx0+(gidx1<<7));
  data0[alu4] = acc0;
  data0[(alu4+64)] = acc1;
}`;

const r_512_16_128_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 64>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 512 */
  var lidx0 = i32(lindex.x); /* 16 */
  var alu0 = (gidx0<<2);
  var alu1 = (alu0+1);
  var alu2 = (alu0+2);
  var alu3 = (alu0+3);
  var val0 = data1[alu1];
  var val1 = data1[alu2];
  var val2 = data1[alu3];
  var val3 = data1[alu0];
  var val4 = data4[alu1];
  var val5 = data4[alu2];
  var val6 = data4[alu3];
  var val7 = data4[alu0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var alu4 = (ridx0<<4);
    var val8 = data2[(lidx0+alu4)];
    var alu5 = (lidx0+(gidx0<<13)+alu4);
    var alu6 = (alu5+2048);
    var alu7 = (alu5+4096);
    var alu8 = (alu5+6144);
    var val9 = atomicLoad(&data3[(alu5>>2)]);
    var val10 = atomicLoad(&data3[(alu6>>2)]);
    var val11 = atomicLoad(&data3[(alu7>>2)]);
    var val12 = atomicLoad(&data3[(alu8>>2)]);
    var alu9 = ((val9>>(((u32(alu5))&3u)<<3u))&255u);
    var precast0 = alu9;
    var alu10 = ((val10>>(((u32(alu6))&3u)<<3u))&255u);
    var precast1 = alu10;
    var alu11 = ((val11>>(((u32(alu7))&3u)<<3u))&255u);
    var precast2 = alu11;
    var alu12 = ((val12>>(((u32(alu8))&3u)<<3u))&255u);
    var precast3 = alu12;
    var precast4 = (select(0u,4294967040u,(0u<(alu9>>7u)))|bitcast<u32>(precast0));
    var precast5 = (select(0u,4294967040u,(0u<(alu10>>7u)))|bitcast<u32>(precast1));
    var precast6 = (select(0u,4294967040u,(0u<(alu11>>7u)))|bitcast<u32>(precast2));
    var precast7 = (select(0u,4294967040u,(0u<(alu12>>7u)))|bitcast<u32>(precast3));
    acc0 = (acc0+(val8*(f32((i32(bitcast<i32>(precast4)))))*val7));
    acc1 = (acc1+(val8*(f32((i32(bitcast<i32>(precast5)))))*val4));
    acc2 = (acc2+(val8*(f32((i32(bitcast<i32>(precast6)))))*val5));
    acc3 = (acc3+(val8*(f32((i32(bitcast<i32>(precast7)))))*val6));
  }
  var alu18 = (lidx0<<2);
  temp0[alu18] = acc0;
  temp0[(alu18+1)] = acc1;
  temp0[(alu18+2)] = acc2;
  temp0[(alu18+3)] = acc3;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc4 = 0.0f;
    var acc5 = 0.0f;
    var acc6 = 0.0f;
    var acc7 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var alu25 = (ridx1<<2);
      var val13 = temp0[(alu25+1)];
      var val14 = temp0[(alu25+2)];
      var val15 = temp0[(alu25+3)];
      var val16 = temp0[alu25];
      acc4 = (acc4+val16);
      acc5 = (acc5+val13);
      acc6 = (acc6+val14);
      acc7 = (acc7+val15);
    }
    data0[alu1] = (val0+acc5);
    data0[alu2] = (val1+acc6);
    data0[alu3] = (val2+acc7);
    data0[alu0] = (val3+acc4);
  }
}`;

const r_8192_16_32_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8192 */
  var lidx0 = i32(lindex.x); /* 16 */
  var val0 = data3[gidx0];
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 32; ridx0++) {
    var alu0 = (ridx0<<6);
    var alu1 = (lidx0+alu0);
    var val1 = data1[alu1];
    var alu2 = (lidx0+(gidx0<<11)+alu0);
    var val2 = data1[(alu1+16)];
    var val3 = data1[(alu1+32)];
    var val4 = data1[(alu1+48)];
    var alu3 = (alu2+16);
    var alu4 = (alu2+32);
    var alu5 = (alu2+48);
    var val5 = atomicLoad(&data2[(alu2>>2)]);
    var val6 = atomicLoad(&data2[(alu3>>2)]);
    var val7 = atomicLoad(&data2[(alu4>>2)]);
    var val8 = atomicLoad(&data2[(alu5>>2)]);
    var alu6 = ((val5>>(((u32(alu2))&3u)<<3u))&255u);
    var precast0 = alu6;
    var alu7 = ((val6>>(((u32(alu3))&3u)<<3u))&255u);
    var precast1 = alu7;
    var alu8 = ((val7>>(((u32(alu4))&3u)<<3u))&255u);
    var precast2 = alu8;
    var alu9 = ((val8>>(((u32(alu5))&3u)<<3u))&255u);
    var precast3 = alu9;
    var precast4 = (select(0u,4294967040u,(0u<(alu6>>7u)))|bitcast<u32>(precast0));
    var precast5 = (select(0u,4294967040u,(0u<(alu7>>7u)))|bitcast<u32>(precast1));
    var precast6 = (select(0u,4294967040u,(0u<(alu8>>7u)))|bitcast<u32>(precast2));
    var precast7 = (select(0u,4294967040u,(0u<(alu9>>7u)))|bitcast<u32>(precast3));
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast4)))))*val0)+(val2*(f32((i32(bitcast<i32>(precast5)))))*val0)+(val3*(f32((i32(bitcast<i32>(precast6)))))*val0)+(val4*(f32((i32(bitcast<i32>(precast7)))))*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val9 = temp0[ridx1];
      acc1 = (acc1+val9);
    }
    data0[gidx0] = acc1;
  }
}`;

const r_2048_16_8_16_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 512>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16,8) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var lidx1 = i32(lindex.y); /* 8 */
  var alu0 = (gidx0<<2);
  var alu1 = (alu0+1);
  var alu2 = (alu0+2);
  var alu3 = (alu0+3);
  var val0 = data4[alu1];
  var val1 = data4[alu2];
  var val2 = data4[alu3];
  var val3 = data4[alu0];
  var val4 = data3[alu1];
  var val5 = data3[alu2];
  var val6 = data3[alu3];
  var val7 = data3[alu0];
  var alu4 = (lidx1<<4);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 16; ridx0++) {
    var alu5 = (ridx0<<7);
    var val8 = data1[(lidx0+alu4+alu5)];
    var alu6 = (lidx0+(gidx0<<13)+alu4+alu5);
    var alu7 = (alu6+2048);
    var alu8 = (alu6+4096);
    var alu9 = (alu6+6144);
    var val9 = atomicLoad(&data2[(alu6>>2)]);
    var val10 = atomicLoad(&data2[(alu7>>2)]);
    var val11 = atomicLoad(&data2[(alu8>>2)]);
    var val12 = atomicLoad(&data2[(alu9>>2)]);
    var alu10 = ((val9>>(((u32(alu6))&3u)<<3u))&255u);
    var precast0 = alu10;
    var alu11 = ((val10>>(((u32(alu7))&3u)<<3u))&255u);
    var precast1 = alu11;
    var alu12 = ((val11>>(((u32(alu8))&3u)<<3u))&255u);
    var precast2 = alu12;
    var alu13 = ((val12>>(((u32(alu9))&3u)<<3u))&255u);
    var precast3 = alu13;
    var precast4 = (select(0u,4294967040u,(0u<(alu10>>7u)))|bitcast<u32>(precast0));
    var precast5 = (select(0u,4294967040u,(0u<(alu11>>7u)))|bitcast<u32>(precast1));
    var precast6 = (select(0u,4294967040u,(0u<(alu12>>7u)))|bitcast<u32>(precast2));
    var precast7 = (select(0u,4294967040u,(0u<(alu13>>7u)))|bitcast<u32>(precast3));
    acc0 = (acc0+(val8*(f32((i32(bitcast<i32>(precast4)))))*val7));
    acc1 = (acc1+(val8*(f32((i32(bitcast<i32>(precast5)))))*val4));
    acc2 = (acc2+(val8*(f32((i32(bitcast<i32>(precast6)))))*val5));
    acc3 = (acc3+(val8*(f32((i32(bitcast<i32>(precast7)))))*val6));
  }
  var alu19 = ((lidx0<<5)+(lidx1<<2));
  temp0[alu19] = acc0;
  temp0[(alu19+1)] = acc1;
  temp0[(alu19+2)] = acc2;
  temp0[(alu19+3)] = acc3;
  workgroupBarrier();
  if ((((bool(lidx0))!=true)&((bool(lidx1))!=true))) {
    var acc4 = 0.0f;
    var acc5 = 0.0f;
    var acc6 = 0.0f;
    var acc7 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      for (var ridx2 = 0; ridx2 < 8; ridx2++) {
        var alu26 = ((ridx1<<5)+(ridx2<<2));
        var val13 = temp0[(alu26+1)];
        var val14 = temp0[(alu26+2)];
        var val15 = temp0[(alu26+3)];
        var val16 = temp0[alu26];
        acc4 = (acc4+val16);
        acc5 = (acc5+val13);
        acc6 = (acc6+val14);
        acc7 = (acc7+val15);
      }
    }
    data0[alu0] = (val3*(1/(exp2((acc4*-1.4426950408889634f))+1.0f))*acc4);
    data0[alu1] = (val0*(1/(exp2((acc5*-1.4426950408889634f))+1.0f))*acc5);
    data0[alu2] = (val1*(1/(exp2((acc6*-1.4426950408889634f))+1.0f))*acc6);
    data0[alu3] = (val2*(1/(exp2((acc7*-1.4426950408889634f))+1.0f))*acc7);
  }
}`;

const r_1024_16_16_32_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 512>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 1024 */
  var lidx0 = i32(lindex.x); /* 16 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = (gidx0<<1);
  var alu1 = (alu0+1);
  var val0 = data1[alu1];
  var val1 = data1[alu0];
  var val2 = data4[alu1];
  var val3 = data4[alu0];
  var alu2 = (lidx1<<9);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  for (var ridx0 = 0; ridx0 < 32; ridx0++) {
    var alu3 = (ridx0<<4);
    var val4 = data2[(lidx0+alu2+alu3)];
    var alu4 = (lidx0+(gidx0<<14)+alu2+alu3);
    var alu5 = (alu4+8192);
    var val5 = atomicLoad(&data3[(alu4>>2)]);
    var val6 = atomicLoad(&data3[(alu5>>2)]);
    var alu6 = ((val5>>(((u32(alu4))&3u)<<3u))&255u);
    var precast0 = alu6;
    var alu7 = ((val6>>(((u32(alu5))&3u)<<3u))&255u);
    var precast1 = alu7;
    var precast2 = (select(0u,4294967040u,(0u<(alu6>>7u)))|bitcast<u32>(precast0));
    var precast3 = (select(0u,4294967040u,(0u<(alu7>>7u)))|bitcast<u32>(precast1));
    acc0 = (acc0+(val4*(f32((i32(bitcast<i32>(precast2)))))*val3));
    acc1 = (acc1+(val4*(f32((i32(bitcast<i32>(precast3)))))*val2));
  }
  var alu11 = ((lidx0<<5)+(lidx1<<1));
  temp0[alu11] = acc0;
  temp0[(alu11+1)] = acc1;
  workgroupBarrier();
  if ((((bool(lidx0))!=true)&((bool(lidx1))!=true))) {
    var acc2 = 0.0f;
    var acc3 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      for (var ridx2 = 0; ridx2 < 16; ridx2++) {
        var alu16 = ((ridx1<<5)+(ridx2<<1));
        var val7 = temp0[(alu16+1)];
        var val8 = temp0[alu16];
        acc2 = (acc2+val8);
        acc3 = (acc3+val7);
      }
    }
    data0[alu1] = (val0+acc3);
    data0[alu0] = (val1+acc2);
  }
}`;

const E_n2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<u32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = data0[0];
  data0[0] = (val0+1u);
}`;

const E_n3 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
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
  var alu3 = ((alu1+1u)^((val2<<13u)+(val1<<13u)+((alu0+1u)>>19u)+8192u));
  var alu4 = (alu1+alu3);
  var alu5 = ((alu4+1u)^((alu3<<15u)+(alu3>>17u)));
  var alu6 = (alu4+alu5);
  var alu7 = ((alu6+1u)^((alu5<<26u)+(alu5>>6u)));
  var alu8 = (alu6+alu7);
  var alu9 = ((alu8+1u)^((alu7<<6u)+(alu7>>26u)));
  var alu10 = (alu9+alu2);
  var alu11 = (val1+alu8+alu10);
  var alu12 = ((alu11+2u)^((alu9<<17u)+(alu2<<17u)+((alu10+1u)>>15u)+131072u));
  var alu13 = (alu11+alu12);
  var alu14 = ((alu13+2u)^((alu12<<29u)+(alu12>>3u)));
  var alu15 = (alu13+alu14);
  var alu16 = ((alu15+2u)^((alu14<<16u)+(alu14>>16u)));
  var alu17 = (alu15+alu16);
  var alu18 = ((alu17+2u)^((alu16<<24u)+(alu16>>8u)));
  var alu19 = (val0+alu18);
  var alu20 = (alu19+alu17+alu2);
  var alu21 = ((alu20+4u)^((val0<<13u)+(alu18<<13u)+((alu19+2u)>>19u)+16384u));
  var alu22 = (alu20+alu21);
  var alu23 = ((alu22+4u)^((alu21<<15u)+(alu21>>17u)));
  var alu24 = (alu22+alu23);
  var alu25 = ((alu24+4u)^((alu23<<26u)+(alu23>>6u)));
  var alu26 = (alu24+alu25);
  var alu27 = ((alu26+4u)^((alu25<<6u)+(alu25>>26u)));
  var alu28 = (val1+alu27);
  var alu29 = (val0+alu26+alu28);
  var alu30 = ((alu29+7u)^((val1<<17u)+(alu27<<17u)+((alu28+3u)>>15u)+393216u));
  var alu31 = (alu29+alu30);
  var alu32 = ((alu31+7u)^((alu30<<29u)+(alu30>>3u)));
  var alu33 = (alu31+alu32);
  var alu34 = ((alu33+7u)^((alu32<<16u)+(alu32>>16u)));
  var alu35 = (alu33+alu34);
  var alu36 = ((alu35+7u)^((alu34<<24u)+(alu34>>8u)));
  var alu37 = (alu36+alu2);
  var alu38 = (val1+alu35+alu37);
  var alu39 = ((alu38+11u)^((alu36<<13u)+(alu2<<13u)+((alu37+4u)>>19u)+32768u));
  var alu40 = (alu38+alu39);
  var alu41 = ((alu40+11u)^((alu39<<15u)+(alu39>>17u)));
  var alu42 = (alu40+alu41);
  var alu43 = ((alu42+11u)^((alu41<<26u)+(alu41>>6u)));
  data0[0] = (val0+((alu42+alu43+11u)^((alu43<<6u)+(alu43>>26u)))+5u);
}`;

const E_n4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
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
  var alu3 = ((alu1+1u)^((val2<<13u)+(val1<<13u)+((alu0+1u)>>19u)+8192u));
  var alu4 = (alu1+alu3);
  var alu5 = ((alu4+1u)^((alu3<<15u)+(alu3>>17u)));
  var alu6 = (alu4+alu5);
  var alu7 = ((alu6+1u)^((alu5<<26u)+(alu5>>6u)));
  var alu8 = (alu6+alu7);
  var alu9 = ((alu8+1u)^((alu7<<6u)+(alu7>>26u)));
  var alu10 = (alu9+alu2);
  var alu11 = (val1+alu8+alu10);
  var alu12 = ((alu11+2u)^((alu9<<17u)+(alu2<<17u)+((alu10+1u)>>15u)+131072u));
  var alu13 = (alu11+alu12);
  var alu14 = ((alu13+2u)^((alu12<<29u)+(alu12>>3u)));
  var alu15 = (alu13+alu14);
  var alu16 = ((alu15+2u)^((alu14<<16u)+(alu14>>16u)));
  var alu17 = (alu15+alu16);
  var alu18 = ((alu17+2u)^((alu16<<24u)+(alu16>>8u)));
  var alu19 = (val0+alu18);
  var alu20 = (alu19+alu17+alu2);
  var alu21 = ((alu20+4u)^((val0<<13u)+(alu18<<13u)+((alu19+2u)>>19u)+16384u));
  var alu22 = (alu20+alu21);
  var alu23 = ((alu22+4u)^((alu21<<15u)+(alu21>>17u)));
  var alu24 = (alu22+alu23);
  var alu25 = ((alu24+4u)^((alu23<<26u)+(alu23>>6u)));
  var alu26 = (alu24+alu25);
  var alu27 = ((alu26+4u)^((alu25<<6u)+(alu25>>26u)));
  var alu28 = (val1+alu27);
  var alu29 = (val0+alu26+alu28);
  var alu30 = ((alu29+7u)^((val1<<17u)+(alu27<<17u)+((alu28+3u)>>15u)+393216u));
  var alu31 = (alu29+alu30);
  var alu32 = ((alu31+7u)^((alu30<<29u)+(alu30>>3u)));
  var alu33 = (alu31+alu32);
  var alu34 = ((alu33+7u)^((alu32<<16u)+(alu32>>16u)));
  var alu35 = (alu33+alu34);
  var alu36 = ((alu35+7u)^((alu34<<24u)+(alu34>>8u)));
  var alu37 = (alu36+alu2);
  var alu38 = (val1+alu35+alu37);
  var alu39 = ((alu38+11u)^((alu36<<13u)+(alu2<<13u)+((alu37+4u)>>19u)+32768u));
  var alu40 = (alu38+alu39);
  var alu41 = ((alu40+11u)^((alu39<<15u)+(alu39>>17u)));
  var alu42 = (alu40+alu41);
  var precast1 = (bitcast<u32>(precast0)|((alu42+((alu42+11u)^((alu41<<26u)+(alu41>>6u)))+alu2+11u)>>9u));
  data0[0] = (bitcast<f32>(precast1)+-1.0f);
}`;

const r_16032_2_16_8_4_2_2_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
var<workgroup> temp0: array<f32, 128>;
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(2,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16032 */
  var lidx0 = i32(lindex.x); /* 2 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = ((gidx0<<3)+(lidx0<<1));
  var alu1 = (alu0+4);
  var alu2 = (alu0+1);
  var alu3 = (alu0+5);
  var alu4 = (lidx0<<6);
  var val0 = data3[alu2];
  var val1 = data3[alu1];
  var val2 = data3[alu3];
  var val3 = data3[alu0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  for (var ridx0 = 0; ridx0 < 8; ridx0++) {
    var alu5 = (ridx0<<8);
    var alu6 = (lidx1+alu5);
    var val4 = data1[alu6];
    var alu7 = (lidx1+(gidx0<<14)+(lidx0<<12)+alu5);
    var val5 = data1[(alu6+16)];
    var val6 = data1[(alu6+32)];
    var val7 = data1[(alu6+48)];
    var val8 = data1[(alu6+64)];
    var val9 = data1[(alu6+80)];
    var val10 = data1[(alu6+96)];
    var val11 = data1[(alu6+112)];
    var val12 = data1[(alu6+128)];
    var val13 = data1[(alu6+144)];
    var val14 = data1[(alu6+160)];
    var val15 = data1[(alu6+176)];
    var val16 = data1[(alu6+192)];
    var val17 = data1[(alu6+208)];
    var val18 = data1[(alu6+224)];
    var val19 = data1[(alu6+240)];
    var alu8 = (alu7+16);
    var alu9 = (alu7+32);
    var alu10 = (alu7+48);
    var alu11 = (alu7+64);
    var alu12 = (alu7+80);
    var alu13 = (alu7+96);
    var alu14 = (alu7+112);
    var alu15 = (alu7+128);
    var alu16 = (alu7+144);
    var alu17 = (alu7+160);
    var alu18 = (alu7+176);
    var alu19 = (alu7+192);
    var alu20 = (alu7+208);
    var alu21 = (alu7+224);
    var alu22 = (alu7+240);
    var alu23 = (alu7+2048);
    var alu24 = (alu7+2064);
    var alu25 = (alu7+2080);
    var alu26 = (alu7+2096);
    var alu27 = (alu7+2112);
    var alu28 = (alu7+2128);
    var alu29 = (alu7+2144);
    var alu30 = (alu7+2160);
    var alu31 = (alu7+2176);
    var alu32 = (alu7+2192);
    var alu33 = (alu7+2208);
    var alu34 = (alu7+2224);
    var alu35 = (alu7+2240);
    var alu36 = (alu7+2256);
    var alu37 = (alu7+2272);
    var alu38 = (alu7+2288);
    var alu39 = (alu7+8192);
    var alu40 = (alu7+8208);
    var alu41 = (alu7+8224);
    var alu42 = (alu7+8240);
    var alu43 = (alu7+8256);
    var alu44 = (alu7+8272);
    var alu45 = (alu7+8288);
    var alu46 = (alu7+8304);
    var alu47 = (alu7+8320);
    var alu48 = (alu7+8336);
    var alu49 = (alu7+8352);
    var alu50 = (alu7+8368);
    var alu51 = (alu7+8384);
    var alu52 = (alu7+8400);
    var alu53 = (alu7+8416);
    var alu54 = (alu7+8432);
    var alu55 = (alu7+10240);
    var alu56 = (alu7+10256);
    var alu57 = (alu7+10272);
    var alu58 = (alu7+10288);
    var alu59 = (alu7+10304);
    var alu60 = (alu7+10320);
    var alu61 = (alu7+10336);
    var alu62 = (alu7+10352);
    var alu63 = (alu7+10368);
    var alu64 = (alu7+10384);
    var alu65 = (alu7+10400);
    var alu66 = (alu7+10416);
    var alu67 = (alu7+10432);
    var alu68 = (alu7+10448);
    var alu69 = (alu7+10464);
    var alu70 = (alu7+10480);
    var val20 = atomicLoad(&data2[(alu7>>2)]);
    var val21 = atomicLoad(&data2[(alu8>>2)]);
    var val22 = atomicLoad(&data2[(alu9>>2)]);
    var val23 = atomicLoad(&data2[(alu10>>2)]);
    var val24 = atomicLoad(&data2[(alu11>>2)]);
    var val25 = atomicLoad(&data2[(alu12>>2)]);
    var val26 = atomicLoad(&data2[(alu13>>2)]);
    var val27 = atomicLoad(&data2[(alu14>>2)]);
    var val28 = atomicLoad(&data2[(alu15>>2)]);
    var val29 = atomicLoad(&data2[(alu16>>2)]);
    var val30 = atomicLoad(&data2[(alu17>>2)]);
    var val31 = atomicLoad(&data2[(alu18>>2)]);
    var val32 = atomicLoad(&data2[(alu19>>2)]);
    var val33 = atomicLoad(&data2[(alu20>>2)]);
    var val34 = atomicLoad(&data2[(alu21>>2)]);
    var val35 = atomicLoad(&data2[(alu22>>2)]);
    var val36 = atomicLoad(&data2[(alu23>>2)]);
    var val37 = atomicLoad(&data2[(alu24>>2)]);
    var val38 = atomicLoad(&data2[(alu25>>2)]);
    var val39 = atomicLoad(&data2[(alu26>>2)]);
    var val40 = atomicLoad(&data2[(alu27>>2)]);
    var val41 = atomicLoad(&data2[(alu28>>2)]);
    var val42 = atomicLoad(&data2[(alu29>>2)]);
    var val43 = atomicLoad(&data2[(alu30>>2)]);
    var val44 = atomicLoad(&data2[(alu31>>2)]);
    var val45 = atomicLoad(&data2[(alu32>>2)]);
    var val46 = atomicLoad(&data2[(alu33>>2)]);
    var val47 = atomicLoad(&data2[(alu34>>2)]);
    var val48 = atomicLoad(&data2[(alu35>>2)]);
    var val49 = atomicLoad(&data2[(alu36>>2)]);
    var val50 = atomicLoad(&data2[(alu37>>2)]);
    var val51 = atomicLoad(&data2[(alu38>>2)]);
    var val52 = atomicLoad(&data2[(alu39>>2)]);
    var val53 = atomicLoad(&data2[(alu40>>2)]);
    var val54 = atomicLoad(&data2[(alu41>>2)]);
    var val55 = atomicLoad(&data2[(alu42>>2)]);
    var val56 = atomicLoad(&data2[(alu43>>2)]);
    var val57 = atomicLoad(&data2[(alu44>>2)]);
    var val58 = atomicLoad(&data2[(alu45>>2)]);
    var val59 = atomicLoad(&data2[(alu46>>2)]);
    var val60 = atomicLoad(&data2[(alu47>>2)]);
    var val61 = atomicLoad(&data2[(alu48>>2)]);
    var val62 = atomicLoad(&data2[(alu49>>2)]);
    var val63 = atomicLoad(&data2[(alu50>>2)]);
    var val64 = atomicLoad(&data2[(alu51>>2)]);
    var val65 = atomicLoad(&data2[(alu52>>2)]);
    var val66 = atomicLoad(&data2[(alu53>>2)]);
    var val67 = atomicLoad(&data2[(alu54>>2)]);
    var val68 = atomicLoad(&data2[(alu55>>2)]);
    var val69 = atomicLoad(&data2[(alu56>>2)]);
    var val70 = atomicLoad(&data2[(alu57>>2)]);
    var val71 = atomicLoad(&data2[(alu58>>2)]);
    var val72 = atomicLoad(&data2[(alu59>>2)]);
    var val73 = atomicLoad(&data2[(alu60>>2)]);
    var val74 = atomicLoad(&data2[(alu61>>2)]);
    var val75 = atomicLoad(&data2[(alu62>>2)]);
    var val76 = atomicLoad(&data2[(alu63>>2)]);
    var val77 = atomicLoad(&data2[(alu64>>2)]);
    var val78 = atomicLoad(&data2[(alu65>>2)]);
    var val79 = atomicLoad(&data2[(alu66>>2)]);
    var val80 = atomicLoad(&data2[(alu67>>2)]);
    var val81 = atomicLoad(&data2[(alu68>>2)]);
    var val82 = atomicLoad(&data2[(alu69>>2)]);
    var val83 = atomicLoad(&data2[(alu70>>2)]);
    var alu71 = ((val20>>(((u32(alu7))&3u)<<3u))&255u);
    var precast0 = alu71;
    var alu72 = ((val21>>(((u32(alu8))&3u)<<3u))&255u);
    var precast1 = alu72;
    var alu73 = ((val22>>(((u32(alu9))&3u)<<3u))&255u);
    var precast2 = alu73;
    var alu74 = ((val23>>(((u32(alu10))&3u)<<3u))&255u);
    var precast3 = alu74;
    var alu75 = ((val24>>(((u32(alu11))&3u)<<3u))&255u);
    var precast4 = alu75;
    var alu76 = ((val25>>(((u32(alu12))&3u)<<3u))&255u);
    var precast5 = alu76;
    var alu77 = ((val26>>(((u32(alu13))&3u)<<3u))&255u);
    var precast6 = alu77;
    var alu78 = ((val27>>(((u32(alu14))&3u)<<3u))&255u);
    var precast7 = alu78;
    var alu79 = ((val28>>(((u32(alu15))&3u)<<3u))&255u);
    var precast8 = alu79;
    var alu80 = ((val29>>(((u32(alu16))&3u)<<3u))&255u);
    var precast9 = alu80;
    var alu81 = ((val30>>(((u32(alu17))&3u)<<3u))&255u);
    var precast10 = alu81;
    var alu82 = ((val31>>(((u32(alu18))&3u)<<3u))&255u);
    var precast11 = alu82;
    var alu83 = ((val32>>(((u32(alu19))&3u)<<3u))&255u);
    var precast12 = alu83;
    var alu84 = ((val33>>(((u32(alu20))&3u)<<3u))&255u);
    var precast13 = alu84;
    var alu85 = ((val34>>(((u32(alu21))&3u)<<3u))&255u);
    var precast14 = alu85;
    var alu86 = ((val35>>(((u32(alu22))&3u)<<3u))&255u);
    var precast15 = alu86;
    var alu87 = ((val36>>(((u32(alu23))&3u)<<3u))&255u);
    var precast16 = alu87;
    var alu88 = ((val37>>(((u32(alu24))&3u)<<3u))&255u);
    var precast17 = alu88;
    var alu89 = ((val38>>(((u32(alu25))&3u)<<3u))&255u);
    var precast18 = alu89;
    var alu90 = ((val39>>(((u32(alu26))&3u)<<3u))&255u);
    var precast19 = alu90;
    var alu91 = ((val40>>(((u32(alu27))&3u)<<3u))&255u);
    var precast20 = alu91;
    var alu92 = ((val41>>(((u32(alu28))&3u)<<3u))&255u);
    var precast21 = alu92;
    var alu93 = ((val42>>(((u32(alu29))&3u)<<3u))&255u);
    var precast22 = alu93;
    var alu94 = ((val43>>(((u32(alu30))&3u)<<3u))&255u);
    var precast23 = alu94;
    var alu95 = ((val44>>(((u32(alu31))&3u)<<3u))&255u);
    var precast24 = alu95;
    var alu96 = ((val45>>(((u32(alu32))&3u)<<3u))&255u);
    var precast25 = alu96;
    var alu97 = ((val46>>(((u32(alu33))&3u)<<3u))&255u);
    var precast26 = alu97;
    var alu98 = ((val47>>(((u32(alu34))&3u)<<3u))&255u);
    var precast27 = alu98;
    var alu99 = ((val48>>(((u32(alu35))&3u)<<3u))&255u);
    var precast28 = alu99;
    var alu100 = ((val49>>(((u32(alu36))&3u)<<3u))&255u);
    var precast29 = alu100;
    var alu101 = ((val50>>(((u32(alu37))&3u)<<3u))&255u);
    var precast30 = alu101;
    var alu102 = ((val51>>(((u32(alu38))&3u)<<3u))&255u);
    var precast31 = alu102;
    var alu103 = ((val52>>(((u32(alu39))&3u)<<3u))&255u);
    var precast32 = alu103;
    var alu104 = ((val53>>(((u32(alu40))&3u)<<3u))&255u);
    var precast33 = alu104;
    var alu105 = ((val54>>(((u32(alu41))&3u)<<3u))&255u);
    var precast34 = alu105;
    var alu106 = ((val55>>(((u32(alu42))&3u)<<3u))&255u);
    var precast35 = alu106;
    var alu107 = ((val56>>(((u32(alu43))&3u)<<3u))&255u);
    var precast36 = alu107;
    var alu108 = ((val57>>(((u32(alu44))&3u)<<3u))&255u);
    var precast37 = alu108;
    var alu109 = ((val58>>(((u32(alu45))&3u)<<3u))&255u);
    var precast38 = alu109;
    var alu110 = ((val59>>(((u32(alu46))&3u)<<3u))&255u);
    var precast39 = alu110;
    var alu111 = ((val60>>(((u32(alu47))&3u)<<3u))&255u);
    var precast40 = alu111;
    var alu112 = ((val61>>(((u32(alu48))&3u)<<3u))&255u);
    var precast41 = alu112;
    var alu113 = ((val62>>(((u32(alu49))&3u)<<3u))&255u);
    var precast42 = alu113;
    var alu114 = ((val63>>(((u32(alu50))&3u)<<3u))&255u);
    var precast43 = alu114;
    var alu115 = ((val64>>(((u32(alu51))&3u)<<3u))&255u);
    var precast44 = alu115;
    var alu116 = ((val65>>(((u32(alu52))&3u)<<3u))&255u);
    var precast45 = alu116;
    var alu117 = ((val66>>(((u32(alu53))&3u)<<3u))&255u);
    var precast46 = alu117;
    var alu118 = ((val67>>(((u32(alu54))&3u)<<3u))&255u);
    var precast47 = alu118;
    var alu119 = ((val68>>(((u32(alu55))&3u)<<3u))&255u);
    var precast48 = alu119;
    var alu120 = ((val69>>(((u32(alu56))&3u)<<3u))&255u);
    var precast49 = alu120;
    var alu121 = ((val70>>(((u32(alu57))&3u)<<3u))&255u);
    var precast50 = alu121;
    var alu122 = ((val71>>(((u32(alu58))&3u)<<3u))&255u);
    var precast51 = alu122;
    var alu123 = ((val72>>(((u32(alu59))&3u)<<3u))&255u);
    var precast52 = alu123;
    var alu124 = ((val73>>(((u32(alu60))&3u)<<3u))&255u);
    var precast53 = alu124;
    var alu125 = ((val74>>(((u32(alu61))&3u)<<3u))&255u);
    var precast54 = alu125;
    var alu126 = ((val75>>(((u32(alu62))&3u)<<3u))&255u);
    var precast55 = alu126;
    var alu127 = ((val76>>(((u32(alu63))&3u)<<3u))&255u);
    var precast56 = alu127;
    var alu128 = ((val77>>(((u32(alu64))&3u)<<3u))&255u);
    var precast57 = alu128;
    var alu129 = ((val78>>(((u32(alu65))&3u)<<3u))&255u);
    var precast58 = alu129;
    var alu130 = ((val79>>(((u32(alu66))&3u)<<3u))&255u);
    var precast59 = alu130;
    var alu131 = ((val80>>(((u32(alu67))&3u)<<3u))&255u);
    var precast60 = alu131;
    var alu132 = ((val81>>(((u32(alu68))&3u)<<3u))&255u);
    var precast61 = alu132;
    var alu133 = ((val82>>(((u32(alu69))&3u)<<3u))&255u);
    var precast62 = alu133;
    var alu134 = ((val83>>(((u32(alu70))&3u)<<3u))&255u);
    var precast63 = alu134;
    var precast64 = (select(0u,4294967040u,(0u<(alu71>>7u)))|bitcast<u32>(precast0));
    var precast65 = (select(0u,4294967040u,(0u<(alu72>>7u)))|bitcast<u32>(precast1));
    var precast66 = (select(0u,4294967040u,(0u<(alu73>>7u)))|bitcast<u32>(precast2));
    var precast67 = (select(0u,4294967040u,(0u<(alu74>>7u)))|bitcast<u32>(precast3));
    var precast68 = (select(0u,4294967040u,(0u<(alu75>>7u)))|bitcast<u32>(precast4));
    var precast69 = (select(0u,4294967040u,(0u<(alu76>>7u)))|bitcast<u32>(precast5));
    var precast70 = (select(0u,4294967040u,(0u<(alu77>>7u)))|bitcast<u32>(precast6));
    var precast71 = (select(0u,4294967040u,(0u<(alu78>>7u)))|bitcast<u32>(precast7));
    var precast72 = (select(0u,4294967040u,(0u<(alu79>>7u)))|bitcast<u32>(precast8));
    var precast73 = (select(0u,4294967040u,(0u<(alu80>>7u)))|bitcast<u32>(precast9));
    var precast74 = (select(0u,4294967040u,(0u<(alu81>>7u)))|bitcast<u32>(precast10));
    var precast75 = (select(0u,4294967040u,(0u<(alu82>>7u)))|bitcast<u32>(precast11));
    var precast76 = (select(0u,4294967040u,(0u<(alu83>>7u)))|bitcast<u32>(precast12));
    var precast77 = (select(0u,4294967040u,(0u<(alu84>>7u)))|bitcast<u32>(precast13));
    var precast78 = (select(0u,4294967040u,(0u<(alu85>>7u)))|bitcast<u32>(precast14));
    var precast79 = (select(0u,4294967040u,(0u<(alu86>>7u)))|bitcast<u32>(precast15));
    var precast80 = (select(0u,4294967040u,(0u<(alu87>>7u)))|bitcast<u32>(precast16));
    var precast81 = (select(0u,4294967040u,(0u<(alu88>>7u)))|bitcast<u32>(precast17));
    var precast82 = (select(0u,4294967040u,(0u<(alu89>>7u)))|bitcast<u32>(precast18));
    var precast83 = (select(0u,4294967040u,(0u<(alu90>>7u)))|bitcast<u32>(precast19));
    var precast84 = (select(0u,4294967040u,(0u<(alu91>>7u)))|bitcast<u32>(precast20));
    var precast85 = (select(0u,4294967040u,(0u<(alu92>>7u)))|bitcast<u32>(precast21));
    var precast86 = (select(0u,4294967040u,(0u<(alu93>>7u)))|bitcast<u32>(precast22));
    var precast87 = (select(0u,4294967040u,(0u<(alu94>>7u)))|bitcast<u32>(precast23));
    var precast88 = (select(0u,4294967040u,(0u<(alu95>>7u)))|bitcast<u32>(precast24));
    var precast89 = (select(0u,4294967040u,(0u<(alu96>>7u)))|bitcast<u32>(precast25));
    var precast90 = (select(0u,4294967040u,(0u<(alu97>>7u)))|bitcast<u32>(precast26));
    var precast91 = (select(0u,4294967040u,(0u<(alu98>>7u)))|bitcast<u32>(precast27));
    var precast92 = (select(0u,4294967040u,(0u<(alu99>>7u)))|bitcast<u32>(precast28));
    var precast93 = (select(0u,4294967040u,(0u<(alu100>>7u)))|bitcast<u32>(precast29));
    var precast94 = (select(0u,4294967040u,(0u<(alu101>>7u)))|bitcast<u32>(precast30));
    var precast95 = (select(0u,4294967040u,(0u<(alu102>>7u)))|bitcast<u32>(precast31));
    var precast96 = (select(0u,4294967040u,(0u<(alu103>>7u)))|bitcast<u32>(precast32));
    var precast97 = (select(0u,4294967040u,(0u<(alu104>>7u)))|bitcast<u32>(precast33));
    var precast98 = (select(0u,4294967040u,(0u<(alu105>>7u)))|bitcast<u32>(precast34));
    var precast99 = (select(0u,4294967040u,(0u<(alu106>>7u)))|bitcast<u32>(precast35));
    var precast100 = (select(0u,4294967040u,(0u<(alu107>>7u)))|bitcast<u32>(precast36));
    var precast101 = (select(0u,4294967040u,(0u<(alu108>>7u)))|bitcast<u32>(precast37));
    var precast102 = (select(0u,4294967040u,(0u<(alu109>>7u)))|bitcast<u32>(precast38));
    var precast103 = (select(0u,4294967040u,(0u<(alu110>>7u)))|bitcast<u32>(precast39));
    var precast104 = (select(0u,4294967040u,(0u<(alu111>>7u)))|bitcast<u32>(precast40));
    var precast105 = (select(0u,4294967040u,(0u<(alu112>>7u)))|bitcast<u32>(precast41));
    var precast106 = (select(0u,4294967040u,(0u<(alu113>>7u)))|bitcast<u32>(precast42));
    var precast107 = (select(0u,4294967040u,(0u<(alu114>>7u)))|bitcast<u32>(precast43));
    var precast108 = (select(0u,4294967040u,(0u<(alu115>>7u)))|bitcast<u32>(precast44));
    var precast109 = (select(0u,4294967040u,(0u<(alu116>>7u)))|bitcast<u32>(precast45));
    var precast110 = (select(0u,4294967040u,(0u<(alu117>>7u)))|bitcast<u32>(precast46));
    var precast111 = (select(0u,4294967040u,(0u<(alu118>>7u)))|bitcast<u32>(precast47));
    var precast112 = (select(0u,4294967040u,(0u<(alu119>>7u)))|bitcast<u32>(precast48));
    var precast113 = (select(0u,4294967040u,(0u<(alu120>>7u)))|bitcast<u32>(precast49));
    var precast114 = (select(0u,4294967040u,(0u<(alu121>>7u)))|bitcast<u32>(precast50));
    var precast115 = (select(0u,4294967040u,(0u<(alu122>>7u)))|bitcast<u32>(precast51));
    var precast116 = (select(0u,4294967040u,(0u<(alu123>>7u)))|bitcast<u32>(precast52));
    var precast117 = (select(0u,4294967040u,(0u<(alu124>>7u)))|bitcast<u32>(precast53));
    var precast118 = (select(0u,4294967040u,(0u<(alu125>>7u)))|bitcast<u32>(precast54));
    var precast119 = (select(0u,4294967040u,(0u<(alu126>>7u)))|bitcast<u32>(precast55));
    var precast120 = (select(0u,4294967040u,(0u<(alu127>>7u)))|bitcast<u32>(precast56));
    var precast121 = (select(0u,4294967040u,(0u<(alu128>>7u)))|bitcast<u32>(precast57));
    var precast122 = (select(0u,4294967040u,(0u<(alu129>>7u)))|bitcast<u32>(precast58));
    var precast123 = (select(0u,4294967040u,(0u<(alu130>>7u)))|bitcast<u32>(precast59));
    var precast124 = (select(0u,4294967040u,(0u<(alu131>>7u)))|bitcast<u32>(precast60));
    var precast125 = (select(0u,4294967040u,(0u<(alu132>>7u)))|bitcast<u32>(precast61));
    var precast126 = (select(0u,4294967040u,(0u<(alu133>>7u)))|bitcast<u32>(precast62));
    var precast127 = (select(0u,4294967040u,(0u<(alu134>>7u)))|bitcast<u32>(precast63));
    acc0 = (acc0+(val4*(f32((i32(bitcast<i32>(precast64)))))*val3)+(val8*(f32((i32(bitcast<i32>(precast68)))))*val3)+(val12*(f32((i32(bitcast<i32>(precast72)))))*val3)+(val16*(f32((i32(bitcast<i32>(precast76)))))*val3)+(val5*(f32((i32(bitcast<i32>(precast65)))))*val3)+(val9*(f32((i32(bitcast<i32>(precast69)))))*val3)+(val13*(f32((i32(bitcast<i32>(precast73)))))*val3)+(val17*(f32((i32(bitcast<i32>(precast77)))))*val3)+(val6*(f32((i32(bitcast<i32>(precast66)))))*val3)+(val10*(f32((i32(bitcast<i32>(precast70)))))*val3)+(val14*(f32((i32(bitcast<i32>(precast74)))))*val3)+(val18*(f32((i32(bitcast<i32>(precast78)))))*val3)+(val7*(f32((i32(bitcast<i32>(precast67)))))*val3)+(val11*(f32((i32(bitcast<i32>(precast71)))))*val3)+(val15*(f32((i32(bitcast<i32>(precast75)))))*val3)+(val19*(f32((i32(bitcast<i32>(precast79)))))*val3));
    acc1 = (acc1+(val4*(f32((i32(bitcast<i32>(precast96)))))*val1)+(val8*(f32((i32(bitcast<i32>(precast100)))))*val1)+(val12*(f32((i32(bitcast<i32>(precast104)))))*val1)+(val16*(f32((i32(bitcast<i32>(precast108)))))*val1)+(val5*(f32((i32(bitcast<i32>(precast97)))))*val1)+(val9*(f32((i32(bitcast<i32>(precast101)))))*val1)+(val13*(f32((i32(bitcast<i32>(precast105)))))*val1)+(val17*(f32((i32(bitcast<i32>(precast109)))))*val1)+(val6*(f32((i32(bitcast<i32>(precast98)))))*val1)+(val10*(f32((i32(bitcast<i32>(precast102)))))*val1)+(val14*(f32((i32(bitcast<i32>(precast106)))))*val1)+(val18*(f32((i32(bitcast<i32>(precast110)))))*val1)+(val7*(f32((i32(bitcast<i32>(precast99)))))*val1)+(val11*(f32((i32(bitcast<i32>(precast103)))))*val1)+(val15*(f32((i32(bitcast<i32>(precast107)))))*val1)+(val19*(f32((i32(bitcast<i32>(precast111)))))*val1));
    acc2 = (acc2+(val4*(f32((i32(bitcast<i32>(precast80)))))*val0)+(val8*(f32((i32(bitcast<i32>(precast84)))))*val0)+(val12*(f32((i32(bitcast<i32>(precast88)))))*val0)+(val16*(f32((i32(bitcast<i32>(precast92)))))*val0)+(val5*(f32((i32(bitcast<i32>(precast81)))))*val0)+(val9*(f32((i32(bitcast<i32>(precast85)))))*val0)+(val13*(f32((i32(bitcast<i32>(precast89)))))*val0)+(val17*(f32((i32(bitcast<i32>(precast93)))))*val0)+(val6*(f32((i32(bitcast<i32>(precast82)))))*val0)+(val10*(f32((i32(bitcast<i32>(precast86)))))*val0)+(val14*(f32((i32(bitcast<i32>(precast90)))))*val0)+(val18*(f32((i32(bitcast<i32>(precast94)))))*val0)+(val7*(f32((i32(bitcast<i32>(precast83)))))*val0)+(val11*(f32((i32(bitcast<i32>(precast87)))))*val0)+(val15*(f32((i32(bitcast<i32>(precast91)))))*val0)+(val19*(f32((i32(bitcast<i32>(precast95)))))*val0));
    acc3 = (acc3+(val4*(f32((i32(bitcast<i32>(precast112)))))*val2)+(val8*(f32((i32(bitcast<i32>(precast116)))))*val2)+(val12*(f32((i32(bitcast<i32>(precast120)))))*val2)+(val16*(f32((i32(bitcast<i32>(precast124)))))*val2)+(val5*(f32((i32(bitcast<i32>(precast113)))))*val2)+(val9*(f32((i32(bitcast<i32>(precast117)))))*val2)+(val13*(f32((i32(bitcast<i32>(precast121)))))*val2)+(val17*(f32((i32(bitcast<i32>(precast125)))))*val2)+(val6*(f32((i32(bitcast<i32>(precast114)))))*val2)+(val10*(f32((i32(bitcast<i32>(precast118)))))*val2)+(val14*(f32((i32(bitcast<i32>(precast122)))))*val2)+(val18*(f32((i32(bitcast<i32>(precast126)))))*val2)+(val7*(f32((i32(bitcast<i32>(precast115)))))*val2)+(val11*(f32((i32(bitcast<i32>(precast119)))))*val2)+(val15*(f32((i32(bitcast<i32>(precast123)))))*val2)+(val19*(f32((i32(bitcast<i32>(precast127)))))*val2));
  }
  var alu140 = (alu4+(lidx1<<2));
  temp0[alu140] = acc0;
  temp0[(alu140+1)] = acc1;
  temp0[(alu140+2)] = acc2;
  temp0[(alu140+3)] = acc3;
  workgroupBarrier();
  if (((bool(lidx1))!=true)) {
    var acc4 = 0.0f;
    var acc5 = 0.0f;
    var acc6 = 0.0f;
    var acc7 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var alu147 = (alu4+(ridx1<<2));
      var val84 = temp0[(alu147+1)];
      var val85 = temp0[(alu147+2)];
      var val86 = temp0[(alu147+3)];
      var val87 = temp0[alu147];
      acc4 = (acc4+val87);
      acc5 = (acc5+val84);
      acc6 = (acc6+val85);
      acc7 = (acc7+val86);
    }
    data0[alu2] = acc6;
    data0[alu1] = acc5;
    data0[alu3] = acc7;
    data0[alu0] = acc4;
  }
}`;

const r_64_501_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64 */
  var acc0 = (f32(-inf(1.0)));
  var acc1 = (f32(-inf(1.0)));
  var acc2 = (f32(-inf(1.0)));
  var acc3 = (f32(-inf(1.0)));
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var alu0 = ((gidx0*2004)+ridx0);
    var val0 = data1[alu0];
    var val1 = data1[(alu0+501)];
    var val2 = data1[(alu0+1002)];
    var val3 = data1[(alu0+1503)];
    var alu1 = (select(val1,(f32(-inf(1.0))),is_nan(val1))*1.0526315789473684f);
    var alu2 = (select(val2,(f32(-inf(1.0))),is_nan(val2))*1.0526315789473684f);
    var alu3 = (select(val3,(f32(-inf(1.0))),is_nan(val3))*1.0526315789473684f);
    var alu4 = (select(val0,(f32(-inf(1.0))),is_nan(val0))*1.0526315789473684f);
    acc0 = select(acc0,alu4,(acc0<alu4));
    acc1 = select(acc1,alu1,(acc1<alu1));
    acc2 = select(acc2,alu2,(acc2<alu2));
    acc3 = select(acc3,alu3,(acc3<alu3));
  }
  var alu10 = (gidx0<<2);
  data0[alu10] = acc0;
  data0[(alu10+1)] = acc1;
  data0[(alu10+2)] = acc2;
  data0[(alu10+3)] = acc3;
}`;

const r_64_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0 = (f32(-inf(1.0)));
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var alu0 = (ridx0<<2);
    var val0 = data1[alu0];
    var val1 = data1[(alu0+1)];
    var val2 = data1[(alu0+2)];
    var val3 = data1[(alu0+3)];
    var alu1 = select(val1,val0,(val1<val0));
    var alu2 = select(val2,alu1,(val2<alu1));
    var alu3 = select(val3,alu2,(val3<alu2));
    acc0 = select(acc0,alu3,(acc0<alu3));
  }
  data0[0] = acc0;
}`;

const r_128_501_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 128 */
  var val0 = data2[0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var alu0 = ((gidx0*1002)+ridx0);
    var val1 = data1[alu0];
    var val2 = data1[(alu0+501)];
    acc0 = (acc0+exp2((((select(val1,(f32(-inf(1.0))),is_nan(val1))*1.0526315789473684f)-val0)*1.4426950408889634f)));
    acc1 = (acc1+exp2((((select(val2,(f32(-inf(1.0))),is_nan(val2))*1.0526315789473684f)-val0)*1.4426950408889634f)));
  }
  var alu4 = (gidx0<<1);
  data0[alu4] = acc0;
  data0[(alu4+1)] = acc1;
}`;

const r_64_4n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var alu0 = (ridx0<<2);
    var val0 = data1[alu0];
    var val1 = data1[(alu0+1)];
    var val2 = data1[(alu0+2)];
    var val3 = data1[(alu0+3)];
    acc0 = (acc0+val3+val2+val1+val0);
  }
  data0[0] = acc0;
}`;

const E_64128_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64128 */
  var val0 = data2[0];
  var val1 = data3[0];
  var alu0 = (gidx0<<1);
  var val2 = data1[alu0];
  var alu1 = (alu0+1);
  var val3 = data1[alu1];
  var alu2 = (1/val1);
  data0[alu1] = (exp2((((select(val3,(f32(-inf(1.0))),is_nan(val3))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu2);
  data0[alu0] = (exp2((((select(val2,(f32(-inf(1.0))),is_nan(val2))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu2);
}`;

const r_501_16_256_16 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 501 */
  var lidx0 = i32(lindex.x); /* 16 */
  var alu0 = (gidx0<<8);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  var acc4 = 0.0f;
  var acc5 = 0.0f;
  var acc6 = 0.0f;
  var acc7 = 0.0f;
  var acc8 = 0.0f;
  var acc9 = 0.0f;
  var acc10 = 0.0f;
  var acc11 = 0.0f;
  var acc12 = 0.0f;
  var acc13 = 0.0f;
  var acc14 = 0.0f;
  var acc15 = 0.0f;
  for (var ridx0 = 0; ridx0 < 256; ridx0++) {
    var alu1 = (lidx0+ridx0);
    var alu2 = (alu1+alu0);
    var val0 = select(0.0f, data1[(alu2+-15)], ((alu1<15)!=true));
    var val1 = select(0.0f, data1[(alu2+-31)], ((alu1<31)!=true));
    var val2 = select(0.0f, data1[(alu2+-47)], ((alu1<47)!=true));
    var val3 = select(0.0f, data1[(alu2+-63)], ((alu1<63)!=true));
    var val4 = select(0.0f, data1[(alu2+-79)], ((alu1<79)!=true));
    var val5 = select(0.0f, data1[(alu2+-95)], ((alu1<95)!=true));
    var val6 = select(0.0f, data1[(alu2+-111)], ((alu1<111)!=true));
    var val7 = select(0.0f, data1[(alu2+-127)], ((alu1<127)!=true));
    var val8 = select(0.0f, data1[(alu2+-143)], ((alu1<143)!=true));
    var val9 = select(0.0f, data1[(alu2+-159)], ((alu1<159)!=true));
    var val10 = select(0.0f, data1[(alu2+-175)], ((alu1<175)!=true));
    var val11 = select(0.0f, data1[(alu2+-191)], ((alu1<191)!=true));
    var val12 = select(0.0f, data1[(alu2+-207)], ((alu1<207)!=true));
    var val13 = select(0.0f, data1[(alu2+-223)], ((alu1<223)!=true));
    var val14 = select(0.0f, data1[(alu2+-239)], ((alu1<239)!=true));
    var val15 = select(0.0f, data1[(alu2+-255)], ((alu1<255)!=true));
    acc0 = (acc0+val15);
    acc1 = (acc1+val14);
    acc2 = (acc2+val13);
    acc3 = (acc3+val12);
    acc4 = (acc4+val11);
    acc5 = (acc5+val10);
    acc6 = (acc6+val9);
    acc7 = (acc7+val8);
    acc8 = (acc8+val7);
    acc9 = (acc9+val6);
    acc10 = (acc10+val5);
    acc11 = (acc11+val4);
    acc12 = (acc12+val3);
    acc13 = (acc13+val2);
    acc14 = (acc14+val1);
    acc15 = (acc15+val0);
  }
  var alu20 = (lidx0+alu0);
  data0[alu20] = acc0;
  data0[(alu20+16)] = acc1;
  data0[(alu20+32)] = acc2;
  data0[(alu20+48)] = acc3;
  data0[(alu20+64)] = acc4;
  data0[(alu20+80)] = acc5;
  data0[(alu20+96)] = acc6;
  data0[(alu20+112)] = acc7;
  data0[(alu20+128)] = acc8;
  data0[(alu20+144)] = acc9;
  data0[(alu20+160)] = acc10;
  data0[(alu20+176)] = acc11;
  data0[(alu20+192)] = acc12;
  data0[(alu20+208)] = acc13;
  data0[(alu20+224)] = acc14;
  data0[(alu20+240)] = acc15;
}`;

const r_167_501_3 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<f32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 167 */
  var alu0 = (gidx0*3);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var alu1 = (alu0+ridx0);
    var alu2 = ((gidx0*768)+(ridx0<<8));
    var val0 = select(0.0f, data1[(alu2+-128001)], ((alu1<501)!=true));
    var val1 = select(0.0f, data1[(alu2+-127745)], ((alu1<500)!=true));
    var val2 = select(0.0f, data1[(alu2+-127489)], ((alu1<499)!=true));
    acc0 = (acc0+val0);
    acc1 = (acc1+val1);
    acc2 = (acc2+val2);
  }
  data0[alu0] = acc0;
  data0[(alu0+1)] = acc1;
  data0[(alu0+2)] = acc2;
}`;

const r_128_501_2n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<i32>;
@group(0) @binding(1)var<storage,read_write>data1:array<f32>;
@group(0) @binding(2)var<storage,read_write>data2:array<f32>;
@group(0) @binding(3)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 128 */
  var val0 = data2[128255];
  var val1 = data3[500];
  var val2 = data1[0];
  var alu0 = (1/(val0+val1));
  var acc0 = 0;
  var acc1 = 0;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var alu1 = ((gidx0*1002)+ridx0);
    var val3 = data2[alu1];
    var val4 = data2[(alu1+501)];
    var val5 = data3[(((alu1+245)>>8)+1)];
    var val6 = data3[(alu1>>8)];
    acc0 = (acc0+(i32(((val2<(alu0*(val3+val6)))!=true))));
    acc1 = (acc1+(i32(((val2<(alu0*(val4+val5)))!=true))));
  }
  var alu5 = (gidx0<<1);
  data0[alu5] = acc0;
  data0[(alu5+1)] = acc1;
}`;

const r_64_4n2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
fn is_nan(v:f32) -> bool { return min(v, 1.0) == 1.0 && max(v, -1.0) == -1.0; }

fn inf(a: f32) -> f32 { return a/0.0; }
@group(0) @binding(0)var<storage,read_write>data0:array<i32>;
@group(0) @binding(1)var<storage,read_write>data1:array<i32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0 = 0;
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var alu0 = (ridx0<<2);
    var val0 = data1[alu0];
    var val1 = data1[(alu0+1)];
    var val2 = data1[(alu0+2)];
    var val3 = data1[(alu0+3)];
    acc0 = (acc0+val3+val2+val1+val0);
  }
  data0[0] = acc0;
}`;

    return {
      "setup": async (device, state_dict, progress) => {

        const buf_0 = createEmptyBuf(device, 2097152);
   const buf_1 = createWeightBuf(device, 513024, state_dict['tok_embeddings.arange']);
   const input0 = createEmptyBuf(device, 4);
   const buf_2 = createWeightBuf(device, 262668288, state_dict['tok_embeddings.weight']);
   const buf_3 = createWeightBuf(device, 513024, state_dict['tok_embeddings.scale']);
   const buf_4 = createEmptyBuf(device, 8192);
   const buf_5 = createEmptyBuf(device, 4);
   const buf_6 = createEmptyBuf(device, 8192);
   const buf_7 = createWeightBuf(device, 8192, state_dict['layers.0.attention_norm.weight']);
   const buf_8 = createEmptyBuf(device, 2048);
   const buf_9 = createWeightBuf(device, 1048576, state_dict['layers.0.attention.wk.weight']);
   const buf_10 = createWeightBuf(device, 2048, state_dict['layers.0.attention.wk.scale']);
   const buf_11 = createEmptyBuf(device, 2048);
   const buf_12 = createWeightBuf(device, 1048576, state_dict['layers.0.attention.wv.weight']);
   const buf_13 = createWeightBuf(device, 2048, state_dict['layers.0.attention.wv.scale']);
   const buf_14 = createEmptyBuf(device, 4194304);
   const buf_15 = createWeightBuf(device, 524288, state_dict['freqs_cis']);
   const buf_16 = createEmptyBuf(device, 8192);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_17 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.wq.weight']);
   const buf_18 = createWeightBuf(device, 8192, state_dict['layers.0.attention.wq.scale']);
   const buf_19 = createEmptyBuf(device, 8192);
   const buf_20 = createEmptyBuf(device, 131200);
   const buf_21 = createEmptyBuf(device, 128);
   const buf_22 = createEmptyBuf(device, 128);
   const buf_23 = createEmptyBuf(device, 131200);
   const buf_24 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.wo.weight']);
   const buf_25 = createWeightBuf(device, 8192, state_dict['layers.0.attention.wo.scale']);
   const buf_26 = createWeightBuf(device, 8192, state_dict['layers.0.ffn_norm.weight']);
   const buf_27 = createEmptyBuf(device, 32768);
   const buf_28 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w3.weight']);
   const buf_29 = createWeightBuf(device, 32768, state_dict['layers.0.feed_forward.w3.scale']);
   const buf_30 = createEmptyBuf(device, 32768);
   const buf_31 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w1.weight']);
   const buf_32 = createWeightBuf(device, 32768, state_dict['layers.0.feed_forward.w1.scale']);
   const buf_33 = createEmptyBuf(device, 8192);
   const buf_34 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w2.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_35 = createWeightBuf(device, 8192, state_dict['layers.0.feed_forward.w2.scale']);
   const buf_36 = createEmptyBuf(device, 8192);
   const buf_37 = createWeightBuf(device, 8192, state_dict['layers.1.attention_norm.weight']);
   const buf_38 = createEmptyBuf(device, 2048);
   const buf_39 = createWeightBuf(device, 1048576, state_dict['layers.1.attention.wk.weight']);
   const buf_40 = createWeightBuf(device, 2048, state_dict['layers.1.attention.wk.scale']);
   const buf_41 = createEmptyBuf(device, 2048);
   const buf_42 = createWeightBuf(device, 1048576, state_dict['layers.1.attention.wv.weight']);
   const buf_43 = createWeightBuf(device, 2048, state_dict['layers.1.attention.wv.scale']);
   const buf_44 = createEmptyBuf(device, 4194304);
   const buf_45 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.wq.weight']);
   const buf_46 = createWeightBuf(device, 8192, state_dict['layers.1.attention.wq.scale']);
   const buf_47 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.wo.weight']);
   const buf_48 = createWeightBuf(device, 8192, state_dict['layers.1.attention.wo.scale']);
   const buf_49 = createWeightBuf(device, 8192, state_dict['layers.1.ffn_norm.weight']);
   const buf_50 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w3.weight']);
   const buf_51 = createWeightBuf(device, 32768, state_dict['layers.1.feed_forward.w3.scale']);
   const buf_52 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w1.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_53 = createWeightBuf(device, 32768, state_dict['layers.1.feed_forward.w1.scale']);
   const buf_54 = createEmptyBuf(device, 8192);
   const buf_55 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w2.weight']);
   const buf_56 = createWeightBuf(device, 8192, state_dict['layers.1.feed_forward.w2.scale']);
   const buf_57 = createEmptyBuf(device, 8192);
   const buf_58 = createWeightBuf(device, 8192, state_dict['layers.2.attention_norm.weight']);
   const buf_59 = createEmptyBuf(device, 2048);
   const buf_60 = createWeightBuf(device, 1048576, state_dict['layers.2.attention.wk.weight']);
   const buf_61 = createWeightBuf(device, 2048, state_dict['layers.2.attention.wk.scale']);
   const buf_62 = createEmptyBuf(device, 2048);
   const buf_63 = createWeightBuf(device, 1048576, state_dict['layers.2.attention.wv.weight']);
   const buf_64 = createWeightBuf(device, 2048, state_dict['layers.2.attention.wv.scale']);
   const buf_65 = createEmptyBuf(device, 4194304);
   const buf_66 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.wq.weight']);
   const buf_67 = createWeightBuf(device, 8192, state_dict['layers.2.attention.wq.scale']);
   const buf_68 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.wo.weight']);
   const buf_69 = createWeightBuf(device, 8192, state_dict['layers.2.attention.wo.scale']);
   const buf_70 = createWeightBuf(device, 8192, state_dict['layers.2.ffn_norm.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_71 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w3.weight']);
   const buf_72 = createWeightBuf(device, 32768, state_dict['layers.2.feed_forward.w3.scale']);
   const buf_73 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w1.weight']);
   const buf_74 = createWeightBuf(device, 32768, state_dict['layers.2.feed_forward.w1.scale']);
   const buf_75 = createEmptyBuf(device, 8192);
   const buf_76 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w2.weight']);
   const buf_77 = createWeightBuf(device, 8192, state_dict['layers.2.feed_forward.w2.scale']);
   const buf_78 = createEmptyBuf(device, 8192);
   const buf_79 = createWeightBuf(device, 8192, state_dict['layers.3.attention_norm.weight']);
   const buf_80 = createEmptyBuf(device, 2048);
   const buf_81 = createWeightBuf(device, 1048576, state_dict['layers.3.attention.wk.weight']);
   const buf_82 = createWeightBuf(device, 2048, state_dict['layers.3.attention.wk.scale']);
   const buf_83 = createEmptyBuf(device, 2048);
   const buf_84 = createWeightBuf(device, 1048576, state_dict['layers.3.attention.wv.weight']);
   const buf_85 = createWeightBuf(device, 2048, state_dict['layers.3.attention.wv.scale']);
   const buf_86 = createEmptyBuf(device, 4194304);
   const buf_87 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.wq.weight']);
   const buf_88 = createWeightBuf(device, 8192, state_dict['layers.3.attention.wq.scale']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_89 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.wo.weight']);
   const buf_90 = createWeightBuf(device, 8192, state_dict['layers.3.attention.wo.scale']);
   const buf_91 = createWeightBuf(device, 8192, state_dict['layers.3.ffn_norm.weight']);
   const buf_92 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w3.weight']);
   const buf_93 = createWeightBuf(device, 32768, state_dict['layers.3.feed_forward.w3.scale']);
   const buf_94 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w1.weight']);
   const buf_95 = createWeightBuf(device, 32768, state_dict['layers.3.feed_forward.w1.scale']);
   const buf_96 = createEmptyBuf(device, 8192);
   const buf_97 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w2.weight']);
   const buf_98 = createWeightBuf(device, 8192, state_dict['layers.3.feed_forward.w2.scale']);
   const buf_99 = createEmptyBuf(device, 8192);
   const buf_100 = createWeightBuf(device, 8192, state_dict['layers.4.attention_norm.weight']);
   const buf_101 = createEmptyBuf(device, 2048);
   const buf_102 = createWeightBuf(device, 1048576, state_dict['layers.4.attention.wk.weight']);
   const buf_103 = createWeightBuf(device, 2048, state_dict['layers.4.attention.wk.scale']);
   const buf_104 = createEmptyBuf(device, 2048);
   const buf_105 = createWeightBuf(device, 1048576, state_dict['layers.4.attention.wv.weight']);
   const buf_106 = createWeightBuf(device, 2048, state_dict['layers.4.attention.wv.scale']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_107 = createEmptyBuf(device, 4194304);
   const buf_108 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.wq.weight']);
   const buf_109 = createWeightBuf(device, 8192, state_dict['layers.4.attention.wq.scale']);
   const buf_110 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.wo.weight']);
   const buf_111 = createWeightBuf(device, 8192, state_dict['layers.4.attention.wo.scale']);
   const buf_112 = createWeightBuf(device, 8192, state_dict['layers.4.ffn_norm.weight']);
   const buf_113 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w3.weight']);
   const buf_114 = createWeightBuf(device, 32768, state_dict['layers.4.feed_forward.w3.scale']);
   const buf_115 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w1.weight']);
   const buf_116 = createWeightBuf(device, 32768, state_dict['layers.4.feed_forward.w1.scale']);
   const buf_117 = createEmptyBuf(device, 8192);
   const buf_118 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w2.weight']);
   const buf_119 = createWeightBuf(device, 8192, state_dict['layers.4.feed_forward.w2.scale']);
   const buf_120 = createEmptyBuf(device, 8192);
   const buf_121 = createWeightBuf(device, 8192, state_dict['layers.5.attention_norm.weight']);
   const buf_122 = createEmptyBuf(device, 2048);
   const buf_123 = createWeightBuf(device, 1048576, state_dict['layers.5.attention.wk.weight']);
   const buf_124 = createWeightBuf(device, 2048, state_dict['layers.5.attention.wk.scale']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_125 = createEmptyBuf(device, 2048);
   const buf_126 = createWeightBuf(device, 1048576, state_dict['layers.5.attention.wv.weight']);
   const buf_127 = createWeightBuf(device, 2048, state_dict['layers.5.attention.wv.scale']);
   const buf_128 = createEmptyBuf(device, 4194304);
   const buf_129 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.wq.weight']);
   const buf_130 = createWeightBuf(device, 8192, state_dict['layers.5.attention.wq.scale']);
   const buf_131 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.wo.weight']);
   const buf_132 = createWeightBuf(device, 8192, state_dict['layers.5.attention.wo.scale']);
   const buf_133 = createWeightBuf(device, 8192, state_dict['layers.5.ffn_norm.weight']);
   const buf_134 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w3.weight']);
   const buf_135 = createWeightBuf(device, 32768, state_dict['layers.5.feed_forward.w3.scale']);
   const buf_136 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w1.weight']);
   const buf_137 = createWeightBuf(device, 32768, state_dict['layers.5.feed_forward.w1.scale']);
   const buf_138 = createEmptyBuf(device, 8192);
   const buf_139 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w2.weight']);
   const buf_140 = createWeightBuf(device, 8192, state_dict['layers.5.feed_forward.w2.scale']);
   const buf_141 = createEmptyBuf(device, 8192);
   const buf_142 = createWeightBuf(device, 8192, state_dict['layers.6.attention_norm.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_143 = createEmptyBuf(device, 2048);
   const buf_144 = createWeightBuf(device, 1048576, state_dict['layers.6.attention.wk.weight']);
   const buf_145 = createWeightBuf(device, 2048, state_dict['layers.6.attention.wk.scale']);
   const buf_146 = createEmptyBuf(device, 2048);
   const buf_147 = createWeightBuf(device, 1048576, state_dict['layers.6.attention.wv.weight']);
   const buf_148 = createWeightBuf(device, 2048, state_dict['layers.6.attention.wv.scale']);
   const buf_149 = createEmptyBuf(device, 4194304);
   const buf_150 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.wq.weight']);
   const buf_151 = createWeightBuf(device, 8192, state_dict['layers.6.attention.wq.scale']);
   const buf_152 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.wo.weight']);
   const buf_153 = createWeightBuf(device, 8192, state_dict['layers.6.attention.wo.scale']);
   const buf_154 = createWeightBuf(device, 8192, state_dict['layers.6.ffn_norm.weight']);
   const buf_155 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w3.weight']);
   const buf_156 = createWeightBuf(device, 32768, state_dict['layers.6.feed_forward.w3.scale']);
   const buf_157 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w1.weight']);
   const buf_158 = createWeightBuf(device, 32768, state_dict['layers.6.feed_forward.w1.scale']);
   const buf_159 = createEmptyBuf(device, 8192);
   const buf_160 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w2.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_161 = createWeightBuf(device, 8192, state_dict['layers.6.feed_forward.w2.scale']);
   const buf_162 = createEmptyBuf(device, 8192);
   const buf_163 = createWeightBuf(device, 8192, state_dict['layers.7.attention_norm.weight']);
   const buf_164 = createEmptyBuf(device, 2048);
   const buf_165 = createWeightBuf(device, 1048576, state_dict['layers.7.attention.wk.weight']);
   const buf_166 = createWeightBuf(device, 2048, state_dict['layers.7.attention.wk.scale']);
   const buf_167 = createEmptyBuf(device, 2048);
   const buf_168 = createWeightBuf(device, 1048576, state_dict['layers.7.attention.wv.weight']);
   const buf_169 = createWeightBuf(device, 2048, state_dict['layers.7.attention.wv.scale']);
   const buf_170 = createEmptyBuf(device, 4194304);
   const buf_171 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.wq.weight']);
   const buf_172 = createWeightBuf(device, 8192, state_dict['layers.7.attention.wq.scale']);
   const buf_173 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.wo.weight']);
   const buf_174 = createWeightBuf(device, 8192, state_dict['layers.7.attention.wo.scale']);
   const buf_175 = createWeightBuf(device, 8192, state_dict['layers.7.ffn_norm.weight']);
   const buf_176 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w3.weight']);
   const buf_177 = createWeightBuf(device, 32768, state_dict['layers.7.feed_forward.w3.scale']);
   const buf_178 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w1.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_179 = createWeightBuf(device, 32768, state_dict['layers.7.feed_forward.w1.scale']);
   const buf_180 = createEmptyBuf(device, 8192);
   const buf_181 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w2.weight']);
   const buf_182 = createWeightBuf(device, 8192, state_dict['layers.7.feed_forward.w2.scale']);
   const buf_183 = createEmptyBuf(device, 8192);
   const buf_184 = createWeightBuf(device, 8192, state_dict['layers.8.attention_norm.weight']);
   const buf_185 = createEmptyBuf(device, 2048);
   const buf_186 = createWeightBuf(device, 1048576, state_dict['layers.8.attention.wk.weight']);
   const buf_187 = createWeightBuf(device, 2048, state_dict['layers.8.attention.wk.scale']);
   const buf_188 = createEmptyBuf(device, 2048);
   const buf_189 = createWeightBuf(device, 1048576, state_dict['layers.8.attention.wv.weight']);
   const buf_190 = createWeightBuf(device, 2048, state_dict['layers.8.attention.wv.scale']);
   const buf_191 = createEmptyBuf(device, 4194304);
   const buf_192 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.wq.weight']);
   const buf_193 = createWeightBuf(device, 8192, state_dict['layers.8.attention.wq.scale']);
   const buf_194 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.wo.weight']);
   const buf_195 = createWeightBuf(device, 8192, state_dict['layers.8.attention.wo.scale']);
   const buf_196 = createWeightBuf(device, 8192, state_dict['layers.8.ffn_norm.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_197 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w3.weight']);
   const buf_198 = createWeightBuf(device, 32768, state_dict['layers.8.feed_forward.w3.scale']);
   const buf_199 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w1.weight']);
   const buf_200 = createWeightBuf(device, 32768, state_dict['layers.8.feed_forward.w1.scale']);
   const buf_201 = createEmptyBuf(device, 8192);
   const buf_202 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w2.weight']);
   const buf_203 = createWeightBuf(device, 8192, state_dict['layers.8.feed_forward.w2.scale']);
   const buf_204 = createEmptyBuf(device, 8192);
   const buf_205 = createWeightBuf(device, 8192, state_dict['layers.9.attention_norm.weight']);
   const buf_206 = createEmptyBuf(device, 2048);
   const buf_207 = createWeightBuf(device, 1048576, state_dict['layers.9.attention.wk.weight']);
   const buf_208 = createWeightBuf(device, 2048, state_dict['layers.9.attention.wk.scale']);
   const buf_209 = createEmptyBuf(device, 2048);
   const buf_210 = createWeightBuf(device, 1048576, state_dict['layers.9.attention.wv.weight']);
   const buf_211 = createWeightBuf(device, 2048, state_dict['layers.9.attention.wv.scale']);
   const buf_212 = createEmptyBuf(device, 4194304);
   const buf_213 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.wq.weight']);
   const buf_214 = createWeightBuf(device, 8192, state_dict['layers.9.attention.wq.scale']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_215 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.wo.weight']);
   const buf_216 = createWeightBuf(device, 8192, state_dict['layers.9.attention.wo.scale']);
   const buf_217 = createWeightBuf(device, 8192, state_dict['layers.9.ffn_norm.weight']);
   const buf_218 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w3.weight']);
   const buf_219 = createWeightBuf(device, 32768, state_dict['layers.9.feed_forward.w3.scale']);
   const buf_220 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w1.weight']);
   const buf_221 = createWeightBuf(device, 32768, state_dict['layers.9.feed_forward.w1.scale']);
   const buf_222 = createEmptyBuf(device, 8192);
   const buf_223 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w2.weight']);
   const buf_224 = createWeightBuf(device, 8192, state_dict['layers.9.feed_forward.w2.scale']);
   const buf_225 = createEmptyBuf(device, 8192);
   const buf_226 = createWeightBuf(device, 8192, state_dict['layers.10.attention_norm.weight']);
   const buf_227 = createEmptyBuf(device, 2048);
   const buf_228 = createWeightBuf(device, 1048576, state_dict['layers.10.attention.wk.weight']);
   const buf_229 = createWeightBuf(device, 2048, state_dict['layers.10.attention.wk.scale']);
   const buf_230 = createEmptyBuf(device, 2048);
   const buf_231 = createWeightBuf(device, 1048576, state_dict['layers.10.attention.wv.weight']);
   const buf_232 = createWeightBuf(device, 2048, state_dict['layers.10.attention.wv.scale']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_233 = createEmptyBuf(device, 4194304);
   const buf_234 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.wq.weight']);
   const buf_235 = createWeightBuf(device, 8192, state_dict['layers.10.attention.wq.scale']);
   const buf_236 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.wo.weight']);
   const buf_237 = createWeightBuf(device, 8192, state_dict['layers.10.attention.wo.scale']);
   const buf_238 = createWeightBuf(device, 8192, state_dict['layers.10.ffn_norm.weight']);
   const buf_239 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w3.weight']);
   const buf_240 = createWeightBuf(device, 32768, state_dict['layers.10.feed_forward.w3.scale']);
   const buf_241 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w1.weight']);
   const buf_242 = createWeightBuf(device, 32768, state_dict['layers.10.feed_forward.w1.scale']);
   const buf_243 = createEmptyBuf(device, 8192);
   const buf_244 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w2.weight']);
   const buf_245 = createWeightBuf(device, 8192, state_dict['layers.10.feed_forward.w2.scale']);
   const buf_246 = createEmptyBuf(device, 8192);
   const buf_247 = createWeightBuf(device, 8192, state_dict['layers.11.attention_norm.weight']);
   const buf_248 = createEmptyBuf(device, 2048);
   const buf_249 = createWeightBuf(device, 1048576, state_dict['layers.11.attention.wk.weight']);
   const buf_250 = createWeightBuf(device, 2048, state_dict['layers.11.attention.wk.scale']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_251 = createEmptyBuf(device, 2048);
   const buf_252 = createWeightBuf(device, 1048576, state_dict['layers.11.attention.wv.weight']);
   const buf_253 = createWeightBuf(device, 2048, state_dict['layers.11.attention.wv.scale']);
   const buf_254 = createEmptyBuf(device, 4194304);
   const buf_255 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.wq.weight']);
   const buf_256 = createWeightBuf(device, 8192, state_dict['layers.11.attention.wq.scale']);
   const buf_257 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.wo.weight']);
   const buf_258 = createWeightBuf(device, 8192, state_dict['layers.11.attention.wo.scale']);
   const buf_259 = createWeightBuf(device, 8192, state_dict['layers.11.ffn_norm.weight']);
   const buf_260 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w3.weight']);
   const buf_261 = createWeightBuf(device, 32768, state_dict['layers.11.feed_forward.w3.scale']);
   const buf_262 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w1.weight']);
   const buf_263 = createWeightBuf(device, 32768, state_dict['layers.11.feed_forward.w1.scale']);
   const buf_264 = createEmptyBuf(device, 8192);
   const buf_265 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w2.weight']);
   const buf_266 = createWeightBuf(device, 8192, state_dict['layers.11.feed_forward.w2.scale']);
   const buf_267 = createEmptyBuf(device, 8192);
   const buf_268 = createWeightBuf(device, 8192, state_dict['layers.12.attention_norm.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_269 = createEmptyBuf(device, 2048);
   const buf_270 = createWeightBuf(device, 1048576, state_dict['layers.12.attention.wk.weight']);
   const buf_271 = createWeightBuf(device, 2048, state_dict['layers.12.attention.wk.scale']);
   const buf_272 = createEmptyBuf(device, 2048);
   const buf_273 = createWeightBuf(device, 1048576, state_dict['layers.12.attention.wv.weight']);
   const buf_274 = createWeightBuf(device, 2048, state_dict['layers.12.attention.wv.scale']);
   const buf_275 = createEmptyBuf(device, 4194304);
   const buf_276 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.wq.weight']);
   const buf_277 = createWeightBuf(device, 8192, state_dict['layers.12.attention.wq.scale']);
   const buf_278 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.wo.weight']);
   const buf_279 = createWeightBuf(device, 8192, state_dict['layers.12.attention.wo.scale']);
   const buf_280 = createWeightBuf(device, 8192, state_dict['layers.12.ffn_norm.weight']);
   const buf_281 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w3.weight']);
   const buf_282 = createWeightBuf(device, 32768, state_dict['layers.12.feed_forward.w3.scale']);
   const buf_283 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w1.weight']);
   const buf_284 = createWeightBuf(device, 32768, state_dict['layers.12.feed_forward.w1.scale']);
   const buf_285 = createEmptyBuf(device, 8192);
   const buf_286 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w2.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_287 = createWeightBuf(device, 8192, state_dict['layers.12.feed_forward.w2.scale']);
   const buf_288 = createEmptyBuf(device, 8192);
   const buf_289 = createWeightBuf(device, 8192, state_dict['layers.13.attention_norm.weight']);
   const buf_290 = createEmptyBuf(device, 2048);
   const buf_291 = createWeightBuf(device, 1048576, state_dict['layers.13.attention.wk.weight']);
   const buf_292 = createWeightBuf(device, 2048, state_dict['layers.13.attention.wk.scale']);
   const buf_293 = createEmptyBuf(device, 2048);
   const buf_294 = createWeightBuf(device, 1048576, state_dict['layers.13.attention.wv.weight']);
   const buf_295 = createWeightBuf(device, 2048, state_dict['layers.13.attention.wv.scale']);
   const buf_296 = createEmptyBuf(device, 4194304);
   const buf_297 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.wq.weight']);
   const buf_298 = createWeightBuf(device, 8192, state_dict['layers.13.attention.wq.scale']);
   const buf_299 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.wo.weight']);
   const buf_300 = createWeightBuf(device, 8192, state_dict['layers.13.attention.wo.scale']);
   const buf_301 = createWeightBuf(device, 8192, state_dict['layers.13.ffn_norm.weight']);
   const buf_302 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w3.weight']);
   const buf_303 = createWeightBuf(device, 32768, state_dict['layers.13.feed_forward.w3.scale']);
   const buf_304 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w1.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_305 = createWeightBuf(device, 32768, state_dict['layers.13.feed_forward.w1.scale']);
   const buf_306 = createEmptyBuf(device, 8192);
   const buf_307 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w2.weight']);
   const buf_308 = createWeightBuf(device, 8192, state_dict['layers.13.feed_forward.w2.scale']);
   const buf_309 = createEmptyBuf(device, 8192);
   const buf_310 = createWeightBuf(device, 8192, state_dict['layers.14.attention_norm.weight']);
   const buf_311 = createEmptyBuf(device, 2048);
   const buf_312 = createWeightBuf(device, 1048576, state_dict['layers.14.attention.wk.weight']);
   const buf_313 = createWeightBuf(device, 2048, state_dict['layers.14.attention.wk.scale']);
   const buf_314 = createEmptyBuf(device, 2048);
   const buf_315 = createWeightBuf(device, 1048576, state_dict['layers.14.attention.wv.weight']);
   const buf_316 = createWeightBuf(device, 2048, state_dict['layers.14.attention.wv.scale']);
   const buf_317 = createEmptyBuf(device, 4194304);
   const buf_318 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.wq.weight']);
   const buf_319 = createWeightBuf(device, 8192, state_dict['layers.14.attention.wq.scale']);
   const buf_320 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.wo.weight']);
   const buf_321 = createWeightBuf(device, 8192, state_dict['layers.14.attention.wo.scale']);
   const buf_322 = createWeightBuf(device, 8192, state_dict['layers.14.ffn_norm.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_323 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w3.weight']);
   const buf_324 = createWeightBuf(device, 32768, state_dict['layers.14.feed_forward.w3.scale']);
   const buf_325 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w1.weight']);
   const buf_326 = createWeightBuf(device, 32768, state_dict['layers.14.feed_forward.w1.scale']);
   const buf_327 = createEmptyBuf(device, 8192);
   const buf_328 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w2.weight']);
   const buf_329 = createWeightBuf(device, 8192, state_dict['layers.14.feed_forward.w2.scale']);
   const buf_330 = createEmptyBuf(device, 8192);
   const buf_331 = createWeightBuf(device, 8192, state_dict['layers.15.attention_norm.weight']);
   const buf_332 = createEmptyBuf(device, 2048);
   const buf_333 = createWeightBuf(device, 1048576, state_dict['layers.15.attention.wk.weight']);
   const buf_334 = createWeightBuf(device, 2048, state_dict['layers.15.attention.wk.scale']);
   const buf_335 = createEmptyBuf(device, 2048);
   const buf_336 = createWeightBuf(device, 1048576, state_dict['layers.15.attention.wv.weight']);
   const buf_337 = createWeightBuf(device, 2048, state_dict['layers.15.attention.wv.scale']);
   const buf_338 = createEmptyBuf(device, 4194304);
   const buf_339 = createEmptyBuf(device, 4);
   const buf_340 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.wq.weight']);
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_341 = createWeightBuf(device, 8192, state_dict['layers.15.attention.wq.scale']);
   const buf_342 = createEmptyBuf(device, 4);
   const buf_343 = createEmptyBuf(device, 8);
   const buf_344 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.wo.weight']);
   const buf_345 = createWeightBuf(device, 8192, state_dict['layers.15.attention.wo.scale']);
   const buf_346 = createEmptyBuf(device, 4);
   const buf_347 = createWeightBuf(device, 8192, state_dict['layers.15.ffn_norm.weight']);
   const buf_348 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w3.weight']);
   const buf_349 = createWeightBuf(device, 32768, state_dict['layers.15.feed_forward.w3.scale']);
   const buf_350 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w1.weight']);
   const buf_351 = createWeightBuf(device, 32768, state_dict['layers.15.feed_forward.w1.scale']);
   const buf_352 = createEmptyBuf(device, 8192);
   const buf_353 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w2.weight']);
   const buf_354 = createWeightBuf(device, 8192, state_dict['layers.15.feed_forward.w2.scale']);
   const buf_355 = createWeightBuf(device, 8192, state_dict['norm.weight']);
   const buf_356 = createEmptyBuf(device, 513024);
   //const buf_357 = createWeightBuf(device, 262668288, state_dict['output.weight']);
   //const buf_358 = createWeightBuf(device, 513024, state_dict['output.scale']);
   const buf_357 = buf_2;
   const buf_358 = buf_3;
   await new Promise(resolve => setTimeout(resolve, 0));
   progress(0.005 * progress.total, 'Loading model:');
   const buf_359 = createEmptyBuf(device, 1024);
   const buf_360 = createEmptyBuf(device, 4);
   const buf_361 = createEmptyBuf(device, 513024);
   const buf_362 = createEmptyBuf(device, 513024);
   const buf_363 = createEmptyBuf(device, 2004);
   const buf_364 = createEmptyBuf(device, 1024);
   const output0 = createEmptyBuf(device, 4);
   const input1 = createUniformBuf(device, 4);

        const gpuWriteBuffer0 = device.createBuffer({size:input0.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });
    const gpuWriteBuffer1 = device.createBuffer({size:input1.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });
        const gpuReadBuffer = device.createBuffer({ size: output0.size, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });

        const kernels = [r_4_256_32_501_4_4, r_512_256_4, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, r_2048_8_16_16, E_32_32_2, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_512_16_128n1, r_512_16_128n1, E_8_64_2, E_n2, r_2048_8_16_16, E_n3, E_32_32_2, E_n4, r_32_28start_pos2B129_8_8, r_8_28start_pos2B129_4, r_16_28start_pos2B129_2, E_16_28start_pos2B129_2, r_16_64_28start_pos2B129_2, r_512_16_128_4, r_16_128, E_1024_2, r_8192_16_32_4, r_2048_16_8_16_4, r_1024_16_16_32_2, r_16_128, E_1024_2, r_16032_2_16_8_4_2_2_4, r_64_501_4, r_64_4, r_128_501_2, r_64_4n1, E_64128_2, r_501_16_256_16, r_167_501_3, r_128_501_2n1, r_64_4n2];
        
        const piplines = [];
        for (let i=0; i<kernels.length; i++) {
          const name = kernels[i];
          const pipeline = await device.createComputePipelineAsync({layout: "auto", compute: { module: device.createShaderModule({ code: name }), entryPoint: "main" }});
          piplines.push(pipeline);
          if (i % 5 === 0) await new Promise(resolve => setTimeout(resolve, 0)); // prevent browser lag
          if (i === Math.floor(kernels.length * 1/3)) {progress(0.025 * progress.total, "Loading model:");}
          if (i === Math.floor(kernels.length * 1/3)) {progress(0.025 * progress.total, "Loading model:");}
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

            addComputePass(device, commandEncoder, piplines[0], [buf_0, buf_1, input0, buf_2, buf_3], [256, 4, 1]);
        addComputePass(device, commandEncoder, piplines[1], [buf_4, buf_0], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[2], [buf_5, buf_4], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[3], [buf_6, buf_4, buf_5, buf_7], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[4], [buf_8, buf_6, buf_9, buf_10], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[5], [buf_11, buf_6, buf_12, buf_13], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[6], [buf_14, buf_8, buf_15, buf_11, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[7], [buf_16, buf_6, buf_17, buf_18], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[8], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[9], [buf_20, buf_19, buf_14, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[10], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[11], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[12], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[13], [buf_16, buf_23, buf_14, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[14], [buf_19, buf_4, buf_16, buf_24, buf_25], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[15], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[16], [buf_16, buf_19, buf_5, buf_26], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[17], [buf_27, buf_16, buf_28, buf_29], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[18], [buf_30, buf_16, buf_31, buf_32, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[19], [buf_33, buf_19, buf_30, buf_34, buf_35], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[20], [buf_5, buf_33], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[21], [buf_36, buf_33, buf_5, buf_37], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[22], [buf_38, buf_36, buf_39, buf_40], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[23], [buf_41, buf_36, buf_42, buf_43], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[24], [buf_44, buf_38, buf_15, buf_41, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[25], [buf_19, buf_36, buf_45, buf_46], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[26], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[27], [buf_20, buf_16, buf_44, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[28], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[29], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[30], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[31], [buf_19, buf_23, buf_44, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[32], [buf_16, buf_33, buf_19, buf_47, buf_48], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[33], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[34], [buf_19, buf_16, buf_5, buf_49], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[35], [buf_27, buf_19, buf_50, buf_51], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[36], [buf_30, buf_19, buf_52, buf_53, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[37], [buf_54, buf_16, buf_30, buf_55, buf_56], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[38], [buf_5, buf_54], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[39], [buf_57, buf_54, buf_5, buf_58], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[40], [buf_59, buf_57, buf_60, buf_61], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[41], [buf_62, buf_57, buf_63, buf_64], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[42], [buf_65, buf_59, buf_15, buf_62, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[43], [buf_16, buf_57, buf_66, buf_67], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[44], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[45], [buf_20, buf_19, buf_65, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[46], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[47], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[48], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[49], [buf_16, buf_23, buf_65, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[50], [buf_19, buf_54, buf_16, buf_68, buf_69], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[51], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[52], [buf_16, buf_19, buf_5, buf_70], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[53], [buf_27, buf_16, buf_71, buf_72], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[54], [buf_30, buf_16, buf_73, buf_74, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[55], [buf_75, buf_19, buf_30, buf_76, buf_77], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[56], [buf_5, buf_75], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[57], [buf_78, buf_75, buf_5, buf_79], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[58], [buf_80, buf_78, buf_81, buf_82], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[59], [buf_83, buf_78, buf_84, buf_85], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[60], [buf_86, buf_80, buf_15, buf_83, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[61], [buf_19, buf_78, buf_87, buf_88], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[62], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[63], [buf_20, buf_16, buf_86, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[64], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[65], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[66], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[67], [buf_19, buf_23, buf_86, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[68], [buf_16, buf_75, buf_19, buf_89, buf_90], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[69], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[70], [buf_19, buf_16, buf_5, buf_91], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[71], [buf_27, buf_19, buf_92, buf_93], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[72], [buf_30, buf_19, buf_94, buf_95, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[73], [buf_96, buf_16, buf_30, buf_97, buf_98], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[74], [buf_5, buf_96], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[75], [buf_99, buf_96, buf_5, buf_100], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[76], [buf_101, buf_99, buf_102, buf_103], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[77], [buf_104, buf_99, buf_105, buf_106], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[78], [buf_107, buf_101, buf_15, buf_104, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[79], [buf_16, buf_99, buf_108, buf_109], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[80], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[81], [buf_20, buf_19, buf_107, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[82], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[83], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[84], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[85], [buf_16, buf_23, buf_107, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[86], [buf_19, buf_96, buf_16, buf_110, buf_111], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[87], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[88], [buf_16, buf_19, buf_5, buf_112], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[89], [buf_27, buf_16, buf_113, buf_114], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[90], [buf_30, buf_16, buf_115, buf_116, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[91], [buf_117, buf_19, buf_30, buf_118, buf_119], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[92], [buf_5, buf_117], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[93], [buf_120, buf_117, buf_5, buf_121], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[94], [buf_122, buf_120, buf_123, buf_124], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[95], [buf_125, buf_120, buf_126, buf_127], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[96], [buf_128, buf_122, buf_15, buf_125, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[97], [buf_19, buf_120, buf_129, buf_130], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[98], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[99], [buf_20, buf_16, buf_128, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[100], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[101], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[102], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[103], [buf_19, buf_23, buf_128, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[104], [buf_16, buf_117, buf_19, buf_131, buf_132], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[105], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[106], [buf_19, buf_16, buf_5, buf_133], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[107], [buf_27, buf_19, buf_134, buf_135], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[108], [buf_30, buf_19, buf_136, buf_137, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[109], [buf_138, buf_16, buf_30, buf_139, buf_140], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[110], [buf_5, buf_138], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[111], [buf_141, buf_138, buf_5, buf_142], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[112], [buf_143, buf_141, buf_144, buf_145], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[113], [buf_146, buf_141, buf_147, buf_148], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[114], [buf_149, buf_143, buf_15, buf_146, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[115], [buf_16, buf_141, buf_150, buf_151], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[116], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[117], [buf_20, buf_19, buf_149, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[118], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[119], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[120], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[121], [buf_16, buf_23, buf_149, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[122], [buf_19, buf_138, buf_16, buf_152, buf_153], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[123], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[124], [buf_16, buf_19, buf_5, buf_154], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[125], [buf_27, buf_16, buf_155, buf_156], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[126], [buf_30, buf_16, buf_157, buf_158, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[127], [buf_159, buf_19, buf_30, buf_160, buf_161], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[128], [buf_5, buf_159], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[129], [buf_162, buf_159, buf_5, buf_163], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[130], [buf_164, buf_162, buf_165, buf_166], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[131], [buf_167, buf_162, buf_168, buf_169], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[132], [buf_170, buf_164, buf_15, buf_167, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[133], [buf_19, buf_162, buf_171, buf_172], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[134], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[135], [buf_20, buf_16, buf_170, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[136], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[137], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[138], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[139], [buf_19, buf_23, buf_170, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[140], [buf_16, buf_159, buf_19, buf_173, buf_174], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[141], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[142], [buf_19, buf_16, buf_5, buf_175], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[143], [buf_27, buf_19, buf_176, buf_177], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[144], [buf_30, buf_19, buf_178, buf_179, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[145], [buf_180, buf_16, buf_30, buf_181, buf_182], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[146], [buf_5, buf_180], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[147], [buf_183, buf_180, buf_5, buf_184], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[148], [buf_185, buf_183, buf_186, buf_187], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[149], [buf_188, buf_183, buf_189, buf_190], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[150], [buf_191, buf_185, buf_15, buf_188, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[151], [buf_16, buf_183, buf_192, buf_193], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[152], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[153], [buf_20, buf_19, buf_191, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[154], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[155], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[156], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[157], [buf_16, buf_23, buf_191, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[158], [buf_19, buf_180, buf_16, buf_194, buf_195], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[159], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[160], [buf_16, buf_19, buf_5, buf_196], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[161], [buf_27, buf_16, buf_197, buf_198], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[162], [buf_30, buf_16, buf_199, buf_200, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[163], [buf_201, buf_19, buf_30, buf_202, buf_203], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[164], [buf_5, buf_201], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[165], [buf_204, buf_201, buf_5, buf_205], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[166], [buf_206, buf_204, buf_207, buf_208], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[167], [buf_209, buf_204, buf_210, buf_211], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[168], [buf_212, buf_206, buf_15, buf_209, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[169], [buf_19, buf_204, buf_213, buf_214], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[170], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[171], [buf_20, buf_16, buf_212, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[172], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[173], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[174], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[175], [buf_19, buf_23, buf_212, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[176], [buf_16, buf_201, buf_19, buf_215, buf_216], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[177], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[178], [buf_19, buf_16, buf_5, buf_217], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[179], [buf_27, buf_19, buf_218, buf_219], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[180], [buf_30, buf_19, buf_220, buf_221, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[181], [buf_222, buf_16, buf_30, buf_223, buf_224], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[182], [buf_5, buf_222], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[183], [buf_225, buf_222, buf_5, buf_226], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[184], [buf_227, buf_225, buf_228, buf_229], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[185], [buf_230, buf_225, buf_231, buf_232], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[186], [buf_233, buf_227, buf_15, buf_230, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[187], [buf_16, buf_225, buf_234, buf_235], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[188], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[189], [buf_20, buf_19, buf_233, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[190], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[191], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[192], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[193], [buf_16, buf_23, buf_233, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[194], [buf_19, buf_222, buf_16, buf_236, buf_237], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[195], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[196], [buf_16, buf_19, buf_5, buf_238], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[197], [buf_27, buf_16, buf_239, buf_240], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[198], [buf_30, buf_16, buf_241, buf_242, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[199], [buf_243, buf_19, buf_30, buf_244, buf_245], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[200], [buf_5, buf_243], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[201], [buf_246, buf_243, buf_5, buf_247], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[202], [buf_248, buf_246, buf_249, buf_250], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[203], [buf_251, buf_246, buf_252, buf_253], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[204], [buf_254, buf_248, buf_15, buf_251, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[205], [buf_19, buf_246, buf_255, buf_256], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[206], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[207], [buf_20, buf_16, buf_254, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[208], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[209], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[210], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[211], [buf_19, buf_23, buf_254, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[212], [buf_16, buf_243, buf_19, buf_257, buf_258], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[213], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[214], [buf_19, buf_16, buf_5, buf_259], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[215], [buf_27, buf_19, buf_260, buf_261], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[216], [buf_30, buf_19, buf_262, buf_263, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[217], [buf_264, buf_16, buf_30, buf_265, buf_266], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[218], [buf_5, buf_264], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[219], [buf_267, buf_264, buf_5, buf_268], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[220], [buf_269, buf_267, buf_270, buf_271], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[221], [buf_272, buf_267, buf_273, buf_274], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[222], [buf_275, buf_269, buf_15, buf_272, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[223], [buf_16, buf_267, buf_276, buf_277], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[224], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[225], [buf_20, buf_19, buf_275, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[226], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[227], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[228], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[229], [buf_16, buf_23, buf_275, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[230], [buf_19, buf_264, buf_16, buf_278, buf_279], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[231], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[232], [buf_16, buf_19, buf_5, buf_280], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[233], [buf_27, buf_16, buf_281, buf_282], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[234], [buf_30, buf_16, buf_283, buf_284, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[235], [buf_285, buf_19, buf_30, buf_286, buf_287], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[236], [buf_5, buf_285], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[237], [buf_288, buf_285, buf_5, buf_289], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[238], [buf_290, buf_288, buf_291, buf_292], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[239], [buf_293, buf_288, buf_294, buf_295], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[240], [buf_296, buf_290, buf_15, buf_293, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[241], [buf_19, buf_288, buf_297, buf_298], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[242], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[243], [buf_20, buf_16, buf_296, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[244], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[245], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[246], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[247], [buf_19, buf_23, buf_296, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[248], [buf_16, buf_285, buf_19, buf_299, buf_300], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[249], [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[250], [buf_19, buf_16, buf_5, buf_301], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[251], [buf_27, buf_19, buf_302, buf_303], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[252], [buf_30, buf_19, buf_304, buf_305, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[253], [buf_306, buf_16, buf_30, buf_307, buf_308], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[254], [buf_5, buf_306], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[255], [buf_309, buf_306, buf_5, buf_310], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[256], [buf_311, buf_309, buf_312, buf_313], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[257], [buf_314, buf_309, buf_315, buf_316], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[258], [buf_317, buf_311, buf_15, buf_314, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[259], [buf_16, buf_309, buf_318, buf_319], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[260], [buf_19, buf_16, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[261], [buf_20, buf_19, buf_317, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[262], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[263], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[264], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[265], [buf_16, buf_23, buf_317, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[266], [buf_19, buf_306, buf_16, buf_320, buf_321], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[267], [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[268], [buf_16, buf_19, buf_5, buf_322], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[269], [buf_27, buf_16, buf_323, buf_324], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[270], [buf_30, buf_16, buf_325, buf_326, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[271], [buf_327, buf_19, buf_30, buf_328, buf_329], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[272], [buf_5, buf_327], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[273], [buf_330, buf_327, buf_5, buf_331], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[274], [buf_332, buf_330, buf_333, buf_334], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[275], [buf_335, buf_330, buf_336, buf_337], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[276], [buf_338, buf_332, buf_15, buf_335, input1], [64, 8, 1]);
        addComputePass(device, commandEncoder, piplines[277], [buf_339], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[278], [buf_19, buf_330, buf_340, buf_341], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[279], [buf_342, buf_339, buf_343], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[280], [buf_16, buf_19, buf_15, input1], [32, 32, 1]);
        addComputePass(device, commandEncoder, piplines[281], [buf_5, buf_339, buf_343], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[282], [buf_20, buf_16, buf_338, input1], [data1[0] + 1, 32, 1]);
        addComputePass(device, commandEncoder, piplines[283], [buf_21, buf_20, input1], [8, 1, 1]);
        addComputePass(device, commandEncoder, piplines[284], [buf_22, buf_20, buf_21, input1], [16, 1, 1]);
        addComputePass(device, commandEncoder, piplines[285], [buf_23, buf_20, buf_21, buf_22, input1], [data1[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, piplines[286], [buf_19, buf_23, buf_338, input1], [64, 16, 1]);
        addComputePass(device, commandEncoder, piplines[287], [buf_16, buf_327, buf_19, buf_344, buf_345], [512, 1, 1]);
        addComputePass(device, commandEncoder, piplines[288], [buf_346, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[289], [buf_19, buf_16, buf_346, buf_347], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[290], [buf_27, buf_19, buf_348, buf_349], [8192, 1, 1]);
        addComputePass(device, commandEncoder, piplines[291], [buf_30, buf_19, buf_350, buf_351, buf_27], [2048, 1, 1]);
        addComputePass(device, commandEncoder, piplines[292], [buf_352, buf_16, buf_30, buf_353, buf_354], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[293], [buf_346, buf_352], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[294], [buf_16, buf_352, buf_346, buf_355], [1024, 1, 1]);
        addComputePass(device, commandEncoder, piplines[295], [buf_356, buf_16, buf_357, buf_358], [16032, 1, 1]);
        addComputePass(device, commandEncoder, piplines[296], [buf_359, buf_356], [64, 1, 1]);
        addComputePass(device, commandEncoder, piplines[297], [buf_346, buf_359], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[298], [buf_359, buf_356, buf_346], [128, 1, 1]);
        addComputePass(device, commandEncoder, piplines[299], [buf_360, buf_359], [1, 1, 1]);
        addComputePass(device, commandEncoder, piplines[300], [buf_361, buf_356, buf_346, buf_360], [64128, 1, 1]);
        addComputePass(device, commandEncoder, piplines[301], [buf_362, buf_361], [501, 1, 1]);
        addComputePass(device, commandEncoder, piplines[302], [buf_363, buf_362], [167, 1, 1]);
        addComputePass(device, commandEncoder, piplines[303], [buf_364, buf_5, buf_362, buf_363], [128, 1, 1]);
        addComputePass(device, commandEncoder, piplines[304], [output0, buf_364], [1, 1, 1]);
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
  