import"./DsnmJJEf.js";import{o as tt}from"./BQLGI1Hr.js";import{p as et,c as w,b as ot,s as z,r as R,n as it,a as H,d as I}from"./2_3Ag8P1.js";import{d as rt,e as nt}from"./BcGM2uHR.js";import{f as at,a as lt}from"./CUr7vh6p.js";import{b as M}from"./DZOLXL9S.js";import{i as st}from"./CrALvu6r.js";var ct=at('<div class="layout svelte-y3pgl8"><div></div> <div class="webgl-canvas-title svelte-y3pgl8">channel data</div> <div></div> <div class="scene-canvas-title svelte-y3pgl8">space</div> <div class="left-y-axis svelte-y3pgl8"></div> <div class="webgl-canvas-container svelte-y3pgl8"><canvas class="svelte-y3pgl8"></canvas></div> <div class="right-y-axis svelte-y3pgl8"></div> <div class="scene-canvas-container svelte-y3pgl8"><canvas class="svelte-y3pgl8"></canvas></div> <div></div> <div class="left-x-axis svelte-y3pgl8"></div> <div></div> <div class="right-x-axis svelte-y3pgl8"></div></div>');function mt(D,G){et(G,!0);let d,o,e,a,m,s={x:100,y:200},r,C,h=256,S=h/2*3,u=-.02,g=.02,p=-.005,x=.055,n=[u,g,p,x],U=I(0),$=I(0);const O=`
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position , 0.0, 1.0);
            }
            `,Y=`
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

            float factor = 1.0;
            if (y<0.0){
            factor = 0.0;
            }

            

            
            float n_el = ${h.toFixed(2)};
            float x0 = ${u.toFixed(6)};
            float x1 = ${g.toFixed(6)};
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
            float field = cos(2.0*3.14159265*center_freq*dt)*intensity*directivity*factor;
            field = field*0.5 + 0.5;

            vec3 color = viridis(field);

            gl_FragColor = vec4(color, 1.0);
        }
    `;let _={r:.1,g:.1,b:.1},c={r:1,g:0,b:0};function V(){const t=window.devicePixelRatio||1,i=()=>{if(!o)return;const f=o.getBoundingClientRect();f.width===0||f.height===0||(o.width=f.width*t,o.height=f.height*t,r.setTransform(t,0,0,t,0,0),requestAnimationFrame(b))};r=o.getContext("2d"),s={x:o.clientWidth/2,y:o.clientHeight/2};const l=new ResizeObserver(i);return l.observe(o),()=>l.disconnect()}function b(){if(!o){console.error("Scene canvas is not initialized.");return}if(!r){console.error("2D context is not initialized.");return}r.clearRect(0,0,o.clientWidth,o.clientHeight),r.beginPath(),r.arc(s.x,s.y,3,0,Math.PI*2),r.fillStyle="rgba("+Math.floor(c.r*255)+","+Math.floor(c.g*255)+","+Math.floor(c.b*255)+", 1)",r.fill(),r.closePath(),r.beginPath();let t=y({x:0,y:0}).y,i=y({x:u,y:0}).x,l=y({x:g,y:0}).x;r.strokeStyle="rgba("+Math.floor(c.r*255)+","+Math.floor(c.g*255)+","+Math.floor(c.b*255)+", 1)",r.lineWidth=2,r.moveTo(i,t),r.lineTo(l,t),r.stroke(),r.closePath()}function X(){if(d.width=h,d.height=S,e=d.getContext("webgl",{antialias:!1}),!e){console.error("WebGL not supported");return}const t=(Q,Z)=>{const P=e.createShader(Q);return e.shaderSource(P,Z),e.compileShader(P),P},i=t(e.VERTEX_SHADER,O),l=t(e.FRAGMENT_SHADER,Y);a=e.createProgram(),e.attachShader(a,i),e.attachShader(a,l),e.linkProgram(a),e.useProgram(a);const f=new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]);m=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,m),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW);const k=e.getAttribLocation(a,"a_position");e.enableVertexAttribArray(k),e.vertexAttribPointer(k,2,e.FLOAT,!1,0,0),C=e.getUniformLocation(a,"u_mousePos")}function W(t){const i=getComputedStyle(document.documentElement).getPropertyValue(t).trim();return{r:parseInt(i.slice(1,3),16)/255,g:parseInt(i.slice(3,5),16)/255,b:parseInt(i.slice(5,7),16)/255}}function q(){_=W("--color-background"),c=W("--color-highlight")}function N(t){return{x:n[0]+t.x/o.clientWidth*(n[1]-n[0]),y:n[2]+t.y/o.clientHeight*(n[3]-n[2])}}function y(t){return{x:(t.x-n[0])/(n[1]-n[0])*o.clientWidth,y:(t.y-n[2])/(n[3]-n[2])*o.clientHeight}}function E(){if(!d){console.log("Canvas is null, stopping animation frame.");return}if(!e){console.log("WebGL context is null, stopping animation frame.");return}let t,i;if(o){const l=window.devicePixelRatio||1;o.clientWidth*l,o.clientHeight*l,t=s.x/o.clientWidth*(g-u)+u,i=s.y/o.clientHeight*(x-p)+p}else t=0,i=0;e.clearColor(_.r,_.g,_.b,1),e.clear(e.COLOR_BUFFER_BIT),e.uniform2f(C,t,i),e.drawArrays(e.TRIANGLES,0,6)}tt(()=>(q(),V(),X(),st.subscribe(()=>{q()}),o&&(H(U,o.clientWidth,!0),H($,o.clientHeight,!0)),requestAnimationFrame(b),requestAnimationFrame(E),()=>{console.log("Cleaning up WebGL resources...");const t=e.getExtension("WEBGL_lose_context");t&&t.loseContext(),e.deleteProgram(a),e.deleteBuffer(m),e=null,a=null}));function j(t,i){s={x:t,y:i},N(s),requestAnimationFrame(E),requestAnimationFrame(b)}function J(t){o&&(o.setPointerCapture(t.pointerId),B(t))}function B(t){if(!o)return;const i=o.getBoundingClientRect();j(t.clientX-i.left,t.clientY-i.top)}function L(t){o&&o.releasePointerCapture(t.pointerId)}var F=ct(),A=z(w(F),10),K=w(A);M(K,t=>d=t,()=>d),R(A);var T=z(A,4),v=w(T);v.__pointerdown=J,v.__pointermove=B,v.__pointerup=L,M(v,t=>o=t,()=>o),R(T),it(8),R(F),nt("pointercancel",v,L),lt(D,F),ot()}rt(["pointerdown","pointermove","pointerup"]);export{mt as U};
