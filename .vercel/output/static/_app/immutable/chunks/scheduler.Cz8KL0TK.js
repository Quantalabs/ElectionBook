function x() {}
const z = (t) => t;
function k(t, n) {
	for (const e in n) t[e] = n[e];
	return t;
}
function w(t) {
	return t();
}
function F() {
	return Object.create(null);
}
function j(t) {
	t.forEach(w);
}
function P(t) {
	return typeof t == 'function';
}
function S(t, n) {
	return t != t ? n == n : t !== n || (t && typeof t == 'object') || typeof t == 'function';
}
function U(t) {
	return Object.keys(t).length === 0;
}
function E(t, ...n) {
	if (t == null) {
		for (const o of n) o(void 0);
		return x;
	}
	const e = t.subscribe(...n);
	return e.unsubscribe ? () => e.unsubscribe() : e;
}
function A(t, n, e) {
	t.$$.on_destroy.push(E(n, e));
}
function B(t, n, e, o) {
	if (t) {
		const r = g(t, n, e, o);
		return t[0](r);
	}
}
function g(t, n, e, o) {
	return t[1] && o ? k(e.ctx.slice(), t[1](o(n))) : e.ctx;
}
function C(t, n, e, o) {
	if (t[2] && o) {
		const r = t[2](o(e));
		if (n.dirty === void 0) return r;
		if (typeof r == 'object') {
			const i = [],
				f = Math.max(n.dirty.length, r.length);
			for (let u = 0; u < f; u += 1) i[u] = n.dirty[u] | r[u];
			return i;
		}
		return n.dirty | r;
	}
	return n.dirty;
}
function D(t, n, e, o, r, i) {
	if (r) {
		const f = g(n, e, o, i);
		t.p(f, r);
	}
}
function G(t) {
	if (t.ctx.length > 32) {
		const n = [],
			e = t.ctx.length / 32;
		for (let o = 0; o < e; o++) n[o] = -1;
		return n;
	}
	return -1;
}
let a;
function d(t) {
	a = t;
}
function y() {
	if (!a) throw new Error('Function called outside component initialization');
	return a;
}
function H(t) {
	y().$$.on_mount.push(t);
}
function I(t) {
	y().$$.after_update.push(t);
}
const l = [],
	p = [];
let s = [];
const b = [],
	m = Promise.resolve();
let h = !1;
function v() {
	h || ((h = !0), m.then(q));
}
function J() {
	return v(), m;
}
function O(t) {
	s.push(t);
}
const _ = new Set();
let c = 0;
function q() {
	if (c !== 0) return;
	const t = a;
	do {
		try {
			for (; c < l.length; ) {
				const n = l[c];
				c++, d(n), M(n.$$);
			}
		} catch (n) {
			throw ((l.length = 0), (c = 0), n);
		}
		for (d(null), l.length = 0, c = 0; p.length; ) p.pop()();
		for (let n = 0; n < s.length; n += 1) {
			const e = s[n];
			_.has(e) || (_.add(e), e());
		}
		s.length = 0;
	} while (l.length);
	for (; b.length; ) b.pop()();
	(h = !1), _.clear(), d(t);
}
function M(t) {
	if (t.fragment !== null) {
		t.update(), j(t.before_update);
		const n = t.dirty;
		(t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, n), t.after_update.forEach(O);
	}
}
function K(t) {
	const n = [],
		e = [];
	s.forEach((o) => (t.indexOf(o) === -1 ? n.push(o) : e.push(o))), e.forEach((o) => o()), (s = n);
}
export {
	C as a,
	A as b,
	B as c,
	I as d,
	p as e,
	O as f,
	G as g,
	z as h,
	P as i,
	F as j,
	q as k,
	U as l,
	K as m,
	x as n,
	H as o,
	a as p,
	d as q,
	j as r,
	S as s,
	J as t,
	D as u,
	w as v,
	l as w,
	v as x
};
