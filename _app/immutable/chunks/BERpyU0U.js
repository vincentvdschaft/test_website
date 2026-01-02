import"./DsnmJJEf.js";import{o as tt}from"./D_3KciIR.js";import{K as et,i as P,L as ot,s as k,j as R,n as it,M as z,N as D}from"./ByC1-jjl.js";import{d as nt,e as rt}from"./Dxo10O4K.js";import{f as at,a as lt}from"./BZ58ImiJ.js";import{b as H}from"./Bn_iPugS.js";import{i as st}from"./utgBnLpg.js";var ct=at('<div class="layout svelte-y3pgl8"><div></div> <div class="webgl-canvas-title svelte-y3pgl8">channel data</div> <div></div> <div class="scene-canvas-title svelte-y3pgl8">space</div> <div class="left-y-axis svelte-y3pgl8"></div> <div class="webgl-canvas-container svelte-y3pgl8"><canvas class="svelte-y3pgl8"></canvas></div> <div class="right-y-axis svelte-y3pgl8"></div> <div class="scene-canvas-container svelte-y3pgl8"><canvas class="svelte-y3pgl8"></canvas></div> <div></div> <div class="left-x-axis svelte-y3pgl8"></div> <div></div> <div class="right-x-axis svelte-y3pgl8"></div></div>');function mt(I,G){et(G,!0);let d,o,e,a,m,s={x:100,y:200},n,C,h=256,S=h/2*3,u=-.02,v=.02,p=-.005,x=.055,r=[u,v,p,x],U=D(0),$=D(0);const N=`
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position , 0.0, 1.0);
            }
            `,O=`
        precision highp float;
        uniform vec2 u_mousePos;

        vec3 viridis(float t) {
            t = clamp(t, 0.0, 1.0);
            float r = 0.279996*1.0 + -0.134458*t + 2.122881*t*t + -14.447921*t*t*t + 24.707925*t*t*t*t + -11.544446*t*t*t*t*t;
            float g = 0.001034*1.0 + 1.603394*t + -1.878751*t*t + 2.656614*t*t*t + -1.657388*t*t*t*t + 0.175274*t*t*t*t*t;
            float b = 0.305867*1.0 + 2.557999*t + -11.757970*t*t + 28.337735*t*t*t + -32.838739*t*t*t*t + 13.495354*t*t*t*t*t;
            return vec3(r, g, b);
        }

        vec3 hot(float t) {
        t = clamp(t, 0.0, 1.0);
            float r = 0.073157*1.0 + 1.068531*t + 15.431515*t*t + -49.660682*t*t*t + 54.356032*t*t*t*t + -20.293524*t*t*t*t*t;
            float g = -0.060867*1.0 + 2.608453*t + -23.653248*t*t + 72.768749*t*t*t + -79.812555*t*t*t*t + 29.135833*t*t*t*t*t;
            float b = 0.043968*1.0 + -1.577867*t + 12.334291*t*t + -34.667542*t*t*t + 38.190745*t*t*t*t + -13.265686*t*t*t*t*t;
            return vec3(r, g, b);
        }

        vec3 coolwarm(float t) {
        t = clamp(t, 0.0, 1.0);
            float r = 0.225442*1.0 + 1.146729*t + 1.200318*t*t + -1.892762*t*t*t;
            float g = 0.266068*1.0 + 2.320890*t + -2.201029*t*t + -0.347485*t*t*t;
            float b = 0.721131*1.0 + 2.290797*t + -5.256201*t*t + 2.387886*t*t*t;
            return vec3(r, g, b);
        }
        void main() {
            float x = u_mousePos.x;
            float y = u_mousePos.y;
            float center_freq = 1e6;
            float period = 1.0/center_freq;
            float sampling_freq = 7e6;// Works
            // float sampling_freq = 4*center_freq; // Does not work

            

            
            float n_el = ${h.toFixed(2)};
            float x0 = ${u.toFixed(6)};
            float x1 = ${v.toFixed(6)};
            float z0 = ${p.toFixed(6)};
            float z1 = ${x.toFixed(6)};
            float n_ax = ${S.toFixed(1)};
            


            vec2 element_pos = vec2(gl_FragCoord.x/n_el*(x1-x0) + x0, 0.0);

            float tau = (y+distance(u_mousePos, element_pos))/1540.0;
            float t = (n_ax-gl_FragCoord.y) / sampling_freq;

            float angle = atan(abs(u_mousePos.x - element_pos.x), y);
 
            float directivity = cos(angle);
            

            float dt = t - tau;
            float intensity = exp(-(dt*dt)/(period*period));
            float field = (cos(2.0*3.14159265*center_freq*dt)*intensity*directivity)*0.5+0.5;

            vec3 color = viridis(field);

            gl_FragColor = vec4(color, 1.0);
        }
    `;let _={r:.1,g:.1,b:.1},c={r:1,g:0,b:0};function Y(){const t=window.devicePixelRatio||1,i=()=>{if(!o)return;const f=o.getBoundingClientRect();f.width===0||f.height===0||(o.width=f.width*t,o.height=f.height*t,n.setTransform(t,0,0,t,0,0),requestAnimationFrame(b))};n=o.getContext("2d"),s={x:o.clientWidth/2,y:o.clientHeight/2};const l=new ResizeObserver(i);return l.observe(o),()=>l.disconnect()}function b(){if(!o){console.error("Scene canvas is not initialized.");return}if(!n){console.error("2D context is not initialized.");return}console.log("Drawing scene..."),n.clearRect(0,0,o.clientWidth,o.clientHeight),n.beginPath(),n.arc(s.x,s.y,3,0,Math.PI*2),n.fillStyle="rgba("+Math.floor(c.r*255)+","+Math.floor(c.g*255)+","+Math.floor(c.b*255)+", 1)",n.fill(),n.closePath(),n.beginPath();let t=y({x:0,y:0}).y,i=y({x:u,y:0}).x,l=y({x:v,y:0}).x;n.strokeStyle="rgba("+Math.floor(c.r*255)+","+Math.floor(c.g*255)+","+Math.floor(c.b*255)+", 1)",n.lineWidth=2,n.moveTo(i,t),n.lineTo(l,t),n.stroke(),n.closePath()}function V(){if(d.width=h,d.height=S,e=d.getContext("webgl",{antialias:!1}),!e){console.error("WebGL not supported");return}const t=(Q,Z)=>{const A=e.createShader(Q);return e.shaderSource(A,Z),e.compileShader(A),A},i=t(e.VERTEX_SHADER,N),l=t(e.FRAGMENT_SHADER,O);a=e.createProgram(),e.attachShader(a,i),e.attachShader(a,l),e.linkProgram(a),e.useProgram(a);const f=new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]);m=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW);const T=e.getAttribLocation(a,"a_position");e.enableVertexAttribArray(T),e.vertexAttribPointer(T,2,e.FLOAT,!1,0,0),C=e.getUniformLocation(a,"u_mousePos")}function W(t){const i=getComputedStyle(document.documentElement).getPropertyValue(t).trim();return{r:parseInt(i.slice(1,3),16)/255,g:parseInt(i.slice(3,5),16)/255,b:parseInt(i.slice(5,7),16)/255}}function q(){_=W("--color-background"),c=W("--color-highlight")}function X(t){return{x:r[0]+t.x/o.clientWidth*(r[1]-r[0]),y:r[2]+t.y/o.clientHeight*(r[3]-r[2])}}function y(t){return{x:(t.x-r[0])/(r[1]-r[0])*o.clientWidth,y:(t.y-r[2])/(r[3]-r[2])*o.clientHeight}}function E(){if(!d){console.log("Canvas is null, stopping animation frame.");return}if(!e){console.log("WebGL context is null, stopping animation frame.");return}console.log("Drawing GL frame...");let t,i;if(o){const l=window.devicePixelRatio||1;o.clientWidth*l,o.clientHeight*l,t=s.x/o.clientWidth*(v-u)+u,i=s.y/o.clientHeight*(x-p)+p}else t=0,i=0;console.log("position:",s," NDC:",t,i),e.clearColor(_.r,_.g,_.b,1),e.clear(e.COLOR_BUFFER_BIT),e.uniform2f(C,t,i),e.drawArrays(e.TRIANGLES,0,6)}tt(()=>(q(),Y(),V(),st.subscribe(()=>{q()}),o&&(z(U,o.clientWidth,!0),z($,o.clientHeight,!0)),requestAnimationFrame(b),requestAnimationFrame(E),()=>{console.log("Cleaning up WebGL resources...");const t=e.getExtension("WEBGL_lose_context");t&&t.loseContext(),e.deleteProgram(a),e.deleteBuffer(m),e=null,a=null}));function j(t,i){s={x:t,y:i},X(s),requestAnimationFrame(E),requestAnimationFrame(b)}function K(t){o&&(o.setPointerCapture(t.pointerId),L(t))}function L(t){if(!o)return;const i=o.getBoundingClientRect();j(t.clientX-i.left,t.clientY-i.top)}function B(t){o&&o.releasePointerCapture(t.pointerId)}var w=ct(),F=k(P(w),10),J=P(F);H(J,t=>d=t,()=>d),R(F);var M=k(F,4),g=P(M);g.__pointerdown=K,g.__pointermove=L,g.__pointerup=B,H(g,t=>o=t,()=>o),R(M),it(8),R(w),rt("pointercancel",g,B),lt(I,w),ot()}nt(["pointerdown","pointermove","pointerup"]);export{mt as U};
