import { s as Ne, n as ot, o as Ae, f as Eo, r as Si } from '../chunks/scheduler.Cz8KL0TK.js';
import {
	S as Ee,
	i as Ue,
	y as Me,
	z as Te,
	d as Q,
	g as N,
	o as E,
	p as Ot,
	j as H,
	m as Qe,
	s as tt,
	e as X,
	h as et,
	c as Z,
	k as W,
	t as it,
	q as ar,
	a as bt,
	n as ur,
	A as Uo,
	B as Lt,
	C as Io,
	b as Nt,
	u as Ie,
	f as At,
	v as Fe,
	w as Re,
	l as Mn,
	x as ze,
	D as wt
} from '../chunks/index.CUnrqcbe.js';
function Sr(t) {
	return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t);
}
function Fo(t) {
	return t;
}
function Ro(t) {
	if (t == null) return Fo;
	var e,
		n,
		r = t.scale[0],
		i = t.scale[1],
		o = t.translate[0],
		a = t.translate[1];
	return function (s, l) {
		l || (e = n = 0);
		var u = 2,
			c = s.length,
			f = new Array(c);
		for (f[0] = (e += s[0]) * r + o, f[1] = (n += s[1]) * i + a; u < c; ) (f[u] = s[u]), ++u;
		return f;
	};
}
function zo(t, e) {
	for (var n, r = t.length, i = r - e; i < --r; ) (n = t[i]), (t[i++] = t[r]), (t[r] = n);
}
function Lo(t, e) {
	return (
		typeof e == 'string' && (e = t.objects[e]),
		e.type === 'GeometryCollection'
			? {
					type: 'FeatureCollection',
					features: e.geometries.map(function (n) {
						return Cr(t, n);
					})
				}
			: Cr(t, e)
	);
}
function Cr(t, e) {
	var n = e.id,
		r = e.bbox,
		i = e.properties == null ? {} : e.properties,
		o = Po(t, e);
	return n == null && r == null
		? { type: 'Feature', properties: i, geometry: o }
		: r == null
			? { type: 'Feature', id: n, properties: i, geometry: o }
			: { type: 'Feature', id: n, bbox: r, properties: i, geometry: o };
}
function Po(t, e) {
	var n = Ro(t.transform),
		r = t.arcs;
	function i(c, f) {
		f.length && f.pop();
		for (var h = r[c < 0 ? ~c : c], d = 0, p = h.length; d < p; ++d) f.push(n(h[d], d));
		c < 0 && zo(f, p);
	}
	function o(c) {
		return n(c);
	}
	function a(c) {
		for (var f = [], h = 0, d = c.length; h < d; ++h) i(c[h], f);
		return f.length < 2 && f.push(f[0]), f;
	}
	function s(c) {
		for (var f = a(c); f.length < 4; ) f.push(f[0]);
		return f;
	}
	function l(c) {
		return c.map(s);
	}
	function u(c) {
		var f = c.type,
			h;
		switch (f) {
			case 'GeometryCollection':
				return { type: f, geometries: c.geometries.map(u) };
			case 'Point':
				h = o(c.coordinates);
				break;
			case 'MultiPoint':
				h = c.coordinates.map(o);
				break;
			case 'LineString':
				h = a(c.arcs);
				break;
			case 'MultiLineString':
				h = c.arcs.map(a);
				break;
			case 'Polygon':
				h = l(c.arcs);
				break;
			case 'MultiPolygon':
				h = c.arcs.map(l);
				break;
			default:
				return null;
		}
		return { type: f, coordinates: h };
	}
	return u(e);
}
function We(t, e) {
	return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ho(t, e) {
	return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function sr(t) {
	let e, n, r;
	t.length !== 2
		? ((e = We), (n = (s, l) => We(t(s), l)), (r = (s, l) => t(s) - l))
		: ((e = t === We || t === Ho ? t : Yo), (n = t), (r = t));
	function i(s, l, u = 0, c = s.length) {
		if (u < c) {
			if (e(l, l) !== 0) return c;
			do {
				const f = (u + c) >>> 1;
				n(s[f], l) < 0 ? (u = f + 1) : (c = f);
			} while (u < c);
		}
		return u;
	}
	function o(s, l, u = 0, c = s.length) {
		if (u < c) {
			if (e(l, l) !== 0) return c;
			do {
				const f = (u + c) >>> 1;
				n(s[f], l) <= 0 ? (u = f + 1) : (c = f);
			} while (u < c);
		}
		return u;
	}
	function a(s, l, u = 0, c = s.length) {
		const f = i(s, l, u, c - 1);
		return f > u && r(s[f - 1], l) > -r(s[f], l) ? f - 1 : f;
	}
	return { left: i, center: a, right: o };
}
function Yo() {
	return 0;
}
function Oo(t) {
	return t === null ? NaN : +t;
}
const Vo = sr(We),
	qo = Vo.right;
sr(Oo).center;
function Bo(t, e) {
	let n, r;
	if (e === void 0)
		for (const i of t)
			i != null && (n === void 0 ? i >= i && (n = r = i) : (n > i && (n = i), r < i && (r = i)));
	else {
		let i = -1;
		for (let o of t)
			(o = e(o, ++i, t)) != null &&
				(n === void 0 ? o >= o && (n = r = o) : (n > o && (n = o), r < o && (r = o)));
	}
	return [n, r];
}
class re {
	constructor() {
		(this._partials = new Float64Array(32)), (this._n = 0);
	}
	add(e) {
		const n = this._partials;
		let r = 0;
		for (let i = 0; i < this._n && i < 32; i++) {
			const o = n[i],
				a = e + o,
				s = Math.abs(e) < Math.abs(o) ? e - (a - o) : o - (a - e);
			s && (n[r++] = s), (e = a);
		}
		return (n[r] = e), (this._n = r + 1), this;
	}
	valueOf() {
		const e = this._partials;
		let n = this._n,
			r,
			i,
			o,
			a = 0;
		if (n > 0) {
			for (a = e[--n]; n > 0 && ((r = a), (i = e[--n]), (a = r + i), (o = i - (a - r)), !o); );
			n > 0 &&
				((o < 0 && e[n - 1] < 0) || (o > 0 && e[n - 1] > 0)) &&
				((i = o * 2), (r = a + i), i == r - a && (a = r));
		}
		return a;
	}
}
class Dr extends Map {
	constructor(e, n = Zo) {
		if (
			(super(),
			Object.defineProperties(this, { _intern: { value: new Map() }, _key: { value: n } }),
			e != null)
		)
			for (const [r, i] of e) this.set(r, i);
	}
	get(e) {
		return super.get(Nr(this, e));
	}
	has(e) {
		return super.has(Nr(this, e));
	}
	set(e, n) {
		return super.set(Wo(this, e), n);
	}
	delete(e) {
		return super.delete(Xo(this, e));
	}
}
function Nr({ _intern: t, _key: e }, n) {
	const r = e(n);
	return t.has(r) ? t.get(r) : n;
}
function Wo({ _intern: t, _key: e }, n) {
	const r = e(n);
	return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function Xo({ _intern: t, _key: e }, n) {
	const r = e(n);
	return t.has(r) && ((n = t.get(r)), t.delete(r)), n;
}
function Zo(t) {
	return t !== null && typeof t == 'object' ? t.valueOf() : t;
}
const Go = Math.sqrt(50),
	Jo = Math.sqrt(10),
	Qo = Math.sqrt(2);
function Ke(t, e, n) {
	const r = (e - t) / Math.max(0, n),
		i = Math.floor(Math.log10(r)),
		o = r / Math.pow(10, i),
		a = o >= Go ? 10 : o >= Jo ? 5 : o >= Qo ? 2 : 1;
	let s, l, u;
	return (
		i < 0
			? ((u = Math.pow(10, -i) / a),
				(s = Math.round(t * u)),
				(l = Math.round(e * u)),
				s / u < t && ++s,
				l / u > e && --l,
				(u = -u))
			: ((u = Math.pow(10, i) * a),
				(s = Math.round(t / u)),
				(l = Math.round(e / u)),
				s * u < t && ++s,
				l * u > e && --l),
		l < s && 0.5 <= n && n < 2 ? Ke(t, e, n * 2) : [s, l, u]
	);
}
function Ko(t, e, n) {
	if (((e = +e), (t = +t), (n = +n), !(n > 0))) return [];
	if (t === e) return [t];
	const r = e < t,
		[i, o, a] = r ? Ke(e, t, n) : Ke(t, e, n);
	if (!(o >= i)) return [];
	const s = o - i + 1,
		l = new Array(s);
	if (r)
		if (a < 0) for (let u = 0; u < s; ++u) l[u] = (o - u) / -a;
		else for (let u = 0; u < s; ++u) l[u] = (o - u) * a;
	else if (a < 0) for (let u = 0; u < s; ++u) l[u] = (i + u) / -a;
	else for (let u = 0; u < s; ++u) l[u] = (i + u) * a;
	return l;
}
function Rn(t, e, n) {
	return (e = +e), (t = +t), (n = +n), Ke(t, e, n)[2];
}
function zn(t, e, n) {
	(e = +e), (t = +t), (n = +n);
	const r = e < t,
		i = r ? Rn(e, t, n) : Rn(t, e, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function jo(t, e) {
	let n;
	if (e === void 0) for (const r of t) r != null && (n < r || (n === void 0 && r >= r)) && (n = r);
	else {
		let r = -1;
		for (let i of t) (i = e(i, ++r, t)) != null && (n < i || (n === void 0 && i >= i)) && (n = i);
	}
	return n;
}
function ta(t, e, n) {
	(t = +t), (e = +e), (n = (i = arguments.length) < 2 ? ((e = t), (t = 0), 1) : i < 3 ? 1 : +n);
	for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
		o[r] = t + r * n;
	return o;
}
var ea = Math.PI,
	na = ea * 2,
	ra = Math.abs,
	lr = Math.sqrt;
function xt() {}
function je(t, e) {
	t && Er.hasOwnProperty(t.type) && Er[t.type](t, e);
}
var Ar = {
		Feature: function (t, e) {
			je(t.geometry, e);
		},
		FeatureCollection: function (t, e) {
			for (var n = t.features, r = -1, i = n.length; ++r < i; ) je(n[r].geometry, e);
		}
	},
	Er = {
		Sphere: function (t, e) {
			e.sphere();
		},
		Point: function (t, e) {
			(t = t.coordinates), e.point(t[0], t[1], t[2]);
		},
		MultiPoint: function (t, e) {
			for (var n = t.coordinates, r = -1, i = n.length; ++r < i; )
				(t = n[r]), e.point(t[0], t[1], t[2]);
		},
		LineString: function (t, e) {
			Ln(t.coordinates, e, 0);
		},
		MultiLineString: function (t, e) {
			for (var n = t.coordinates, r = -1, i = n.length; ++r < i; ) Ln(n[r], e, 0);
		},
		Polygon: function (t, e) {
			Ur(t.coordinates, e);
		},
		MultiPolygon: function (t, e) {
			for (var n = t.coordinates, r = -1, i = n.length; ++r < i; ) Ur(n[r], e);
		},
		GeometryCollection: function (t, e) {
			for (var n = t.geometries, r = -1, i = n.length; ++r < i; ) je(n[r], e);
		}
	};
function Ln(t, e, n) {
	var r = -1,
		i = t.length - n,
		o;
	for (e.lineStart(); ++r < i; ) (o = t[r]), e.point(o[0], o[1], o[2]);
	e.lineEnd();
}
function Ur(t, e) {
	var n = -1,
		r = t.length;
	for (e.polygonStart(); ++n < r; ) Ln(t[n], e, 1);
	e.polygonEnd();
}
function ce(t, e) {
	t && Ar.hasOwnProperty(t.type) ? Ar[t.type](t, e) : je(t, e);
}
const ia = (t) => t;
var Tn = new re(),
	Pn = new re(),
	Ci,
	Di,
	Hn,
	Yn,
	Dt = {
		point: xt,
		lineStart: xt,
		lineEnd: xt,
		polygonStart: function () {
			(Dt.lineStart = oa), (Dt.lineEnd = ua);
		},
		polygonEnd: function () {
			(Dt.lineStart = Dt.lineEnd = Dt.point = xt), Tn.add(ra(Pn)), (Pn = new re());
		},
		result: function () {
			var t = Tn / 2;
			return (Tn = new re()), t;
		}
	};
function oa() {
	Dt.point = aa;
}
function aa(t, e) {
	(Dt.point = Ni), (Ci = Hn = t), (Di = Yn = e);
}
function Ni(t, e) {
	Pn.add(Yn * t - Hn * e), (Hn = t), (Yn = e);
}
function ua() {
	Ni(Ci, Di);
}
var ie = 1 / 0,
	tn = ie,
	ke = -ie,
	en = ke,
	Ir = {
		point: sa,
		lineStart: xt,
		lineEnd: xt,
		polygonStart: xt,
		polygonEnd: xt,
		result: function () {
			var t = [
				[ie, tn],
				[ke, en]
			];
			return (ke = en = -(tn = ie = 1 / 0)), t;
		}
	};
function sa(t, e) {
	t < ie && (ie = t), t > ke && (ke = t), e < tn && (tn = e), e > en && (en = e);
}
var On = 0,
	Vn = 0,
	pe = 0,
	nn = 0,
	rn = 0,
	jt = 0,
	qn = 0,
	Bn = 0,
	ye = 0,
	Ai,
	Ei,
	Tt,
	kt,
	mt = {
		point: Bt,
		lineStart: Fr,
		lineEnd: Rr,
		polygonStart: function () {
			(mt.lineStart = fa), (mt.lineEnd = ha);
		},
		polygonEnd: function () {
			(mt.point = Bt), (mt.lineStart = Fr), (mt.lineEnd = Rr);
		},
		result: function () {
			var t = ye
				? [qn / ye, Bn / ye]
				: jt
					? [nn / jt, rn / jt]
					: pe
						? [On / pe, Vn / pe]
						: [NaN, NaN];
			return (On = Vn = pe = nn = rn = jt = qn = Bn = ye = 0), t;
		}
	};
function Bt(t, e) {
	(On += t), (Vn += e), ++pe;
}
function Fr() {
	mt.point = la;
}
function la(t, e) {
	(mt.point = ca), Bt((Tt = t), (kt = e));
}
function ca(t, e) {
	var n = t - Tt,
		r = e - kt,
		i = lr(n * n + r * r);
	(nn += (i * (Tt + t)) / 2), (rn += (i * (kt + e)) / 2), (jt += i), Bt((Tt = t), (kt = e));
}
function Rr() {
	mt.point = Bt;
}
function fa() {
	mt.point = da;
}
function ha() {
	Ui(Ai, Ei);
}
function da(t, e) {
	(mt.point = Ui), Bt((Ai = Tt = t), (Ei = kt = e));
}
function Ui(t, e) {
	var n = t - Tt,
		r = e - kt,
		i = lr(n * n + r * r);
	(nn += (i * (Tt + t)) / 2),
		(rn += (i * (kt + e)) / 2),
		(jt += i),
		(i = kt * t - Tt * e),
		(qn += i * (Tt + t)),
		(Bn += i * (kt + e)),
		(ye += i * 3),
		Bt((Tt = t), (kt = e));
}
function Ii(t) {
	this._context = t;
}
Ii.prototype = {
	_radius: 4.5,
	pointRadius: function (t) {
		return (this._radius = t), this;
	},
	polygonStart: function () {
		this._line = 0;
	},
	polygonEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		this._line === 0 && this._context.closePath(), (this._point = NaN);
	},
	point: function (t, e) {
		switch (this._point) {
			case 0: {
				this._context.moveTo(t, e), (this._point = 1);
				break;
			}
			case 1: {
				this._context.lineTo(t, e);
				break;
			}
			default: {
				this._context.moveTo(t + this._radius, e), this._context.arc(t, e, this._radius, 0, na);
				break;
			}
		}
	},
	result: xt
};
var Wn = new re(),
	kn,
	Fi,
	Ri,
	_e,
	ve,
	$e = {
		point: xt,
		lineStart: function () {
			$e.point = ma;
		},
		lineEnd: function () {
			kn && zi(Fi, Ri), ($e.point = xt);
		},
		polygonStart: function () {
			kn = !0;
		},
		polygonEnd: function () {
			kn = null;
		},
		result: function () {
			var t = +Wn;
			return (Wn = new re()), t;
		}
	};
function ma(t, e) {
	($e.point = zi), (Fi = _e = t), (Ri = ve = e);
}
function zi(t, e) {
	(_e -= t), (ve -= e), Wn.add(lr(_e * _e + ve * ve)), (_e = t), (ve = e);
}
let zr, on, Lr, Pr;
class Hr {
	constructor(e) {
		(this._append = e == null ? Li : ga(e)), (this._radius = 4.5), (this._ = '');
	}
	pointRadius(e) {
		return (this._radius = +e), this;
	}
	polygonStart() {
		this._line = 0;
	}
	polygonEnd() {
		this._line = NaN;
	}
	lineStart() {
		this._point = 0;
	}
	lineEnd() {
		this._line === 0 && (this._ += 'Z'), (this._point = NaN);
	}
	point(e, n) {
		switch (this._point) {
			case 0: {
				this._append`M${e},${n}`, (this._point = 1);
				break;
			}
			case 1: {
				this._append`L${e},${n}`;
				break;
			}
			default: {
				if ((this._append`M${e},${n}`, this._radius !== Lr || this._append !== on)) {
					const r = this._radius,
						i = this._;
					(this._ = ''),
						this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`,
						(Lr = r),
						(on = this._append),
						(Pr = this._),
						(this._ = i);
				}
				this._ += Pr;
				break;
			}
		}
	}
	result() {
		const e = this._;
		return (this._ = ''), e.length ? e : null;
	}
}
function Li(t) {
	let e = 1;
	this._ += t[0];
	for (const n = t.length; e < n; ++e) this._ += arguments[e] + t[e];
}
function ga(t) {
	const e = Math.floor(t);
	if (!(e >= 0)) throw new RangeError(`invalid digits: ${t}`);
	if (e > 15) return Li;
	if (e !== zr) {
		const n = 10 ** e;
		(zr = e),
			(on = function (i) {
				let o = 1;
				this._ += i[0];
				for (const a = i.length; o < a; ++o) this._ += Math.round(arguments[o] * n) / n + i[o];
			});
	}
	return on;
}
function pa(t, e) {
	let n = 3,
		r = 4.5,
		i,
		o;
	function a(s) {
		return (
			s && (typeof r == 'function' && o.pointRadius(+r.apply(this, arguments)), ce(s, i(o))),
			o.result()
		);
	}
	return (
		(a.area = function (s) {
			return ce(s, i(Dt)), Dt.result();
		}),
		(a.measure = function (s) {
			return ce(s, i($e)), $e.result();
		}),
		(a.bounds = function (s) {
			return ce(s, i(Ir)), Ir.result();
		}),
		(a.centroid = function (s) {
			return ce(s, i(mt)), mt.result();
		}),
		(a.projection = function (s) {
			return arguments.length ? ((i = s == null ? ((t = null), ia) : (t = s).stream), a) : t;
		}),
		(a.context = function (s) {
			return arguments.length
				? ((o = s == null ? ((e = null), new Hr(n)) : new Ii((e = s))),
					typeof r != 'function' && o.pointRadius(r),
					a)
				: e;
		}),
		(a.pointRadius = function (s) {
			return arguments.length ? ((r = typeof s == 'function' ? s : (o.pointRadius(+s), +s)), a) : r;
		}),
		(a.digits = function (s) {
			if (!arguments.length) return n;
			if (s == null) n = null;
			else {
				const l = Math.floor(s);
				if (!(l >= 0)) throw new RangeError(`invalid digits: ${s}`);
				n = l;
			}
			return e === null && (o = new Hr(n)), a;
		}),
		a.projection(t).digits(n).context(e)
	);
}
function ya(t) {
	return t;
}
var $n = 1,
	Sn = 2,
	Xn = 3,
	we = 4,
	Yr = 1e-6;
function _a(t) {
	return 'translate(' + t + ',0)';
}
function va(t) {
	return 'translate(0,' + t + ')';
}
function wa(t) {
	return (e) => +t(e);
}
function xa(t, e) {
	return (
		(e = Math.max(0, t.bandwidth() - e * 2) / 2), t.round() && (e = Math.round(e)), (n) => +t(n) + e
	);
}
function ba() {
	return !this.__axis;
}
function Pi(t, e) {
	var n = [],
		r = null,
		i = null,
		o = 6,
		a = 6,
		s = 3,
		l = typeof window < 'u' && window.devicePixelRatio > 1 ? 0 : 0.5,
		u = t === $n || t === we ? -1 : 1,
		c = t === we || t === Sn ? 'x' : 'y',
		f = t === $n || t === Xn ? _a : va;
	function h(d) {
		var p = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()),
			x = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : ya),
			_ = Math.max(o, 0) + s,
			g = e.range(),
			w = +g[0] + l,
			$ = +g[g.length - 1] + l,
			F = (e.bandwidth ? xa : wa)(e.copy(), l),
			U = d.selection ? d.selection() : d,
			M = U.selectAll('.domain').data([null]),
			C = U.selectAll('.tick').data(p, e).order(),
			I = C.exit(),
			L = C.enter().append('g').attr('class', 'tick'),
			O = C.select('line'),
			A = C.select('text');
		(M = M.merge(
			M.enter().insert('path', '.tick').attr('class', 'domain').attr('stroke', 'currentColor')
		)),
			(C = C.merge(L)),
			(O = O.merge(
				L.append('line')
					.attr('stroke', 'currentColor')
					.attr(c + '2', u * o)
			)),
			(A = A.merge(
				L.append('text')
					.attr('fill', 'currentColor')
					.attr(c, u * _)
					.attr('dy', t === $n ? '0em' : t === Xn ? '0.71em' : '0.32em')
			)),
			d !== U &&
				((M = M.transition(d)),
				(C = C.transition(d)),
				(O = O.transition(d)),
				(A = A.transition(d)),
				(I = I.transition(d)
					.attr('opacity', Yr)
					.attr('transform', function (Y) {
						return isFinite((Y = F(Y))) ? f(Y + l) : this.getAttribute('transform');
					})),
				L.attr('opacity', Yr).attr('transform', function (Y) {
					var z = this.parentNode.__axis;
					return f((z && isFinite((z = z(Y))) ? z : F(Y)) + l);
				})),
			I.remove(),
			M.attr(
				'd',
				t === we || t === Sn
					? a
						? 'M' + u * a + ',' + w + 'H' + l + 'V' + $ + 'H' + u * a
						: 'M' + l + ',' + w + 'V' + $
					: a
						? 'M' + w + ',' + u * a + 'V' + l + 'H' + $ + 'V' + u * a
						: 'M' + w + ',' + l + 'H' + $
			),
			C.attr('opacity', 1).attr('transform', function (Y) {
				return f(F(Y) + l);
			}),
			O.attr(c + '2', u * o),
			A.attr(c, u * _).text(x),
			U.filter(ba)
				.attr('fill', 'none')
				.attr('font-size', 10)
				.attr('font-family', 'sans-serif')
				.attr('text-anchor', t === Sn ? 'start' : t === we ? 'end' : 'middle'),
			U.each(function () {
				this.__axis = F;
			});
	}
	return (
		(h.scale = function (d) {
			return arguments.length ? ((e = d), h) : e;
		}),
		(h.ticks = function () {
			return (n = Array.from(arguments)), h;
		}),
		(h.tickArguments = function (d) {
			return arguments.length ? ((n = d == null ? [] : Array.from(d)), h) : n.slice();
		}),
		(h.tickValues = function (d) {
			return arguments.length ? ((r = d == null ? null : Array.from(d)), h) : r && r.slice();
		}),
		(h.tickFormat = function (d) {
			return arguments.length ? ((i = d), h) : i;
		}),
		(h.tickSize = function (d) {
			return arguments.length ? ((o = a = +d), h) : o;
		}),
		(h.tickSizeInner = function (d) {
			return arguments.length ? ((o = +d), h) : o;
		}),
		(h.tickSizeOuter = function (d) {
			return arguments.length ? ((a = +d), h) : a;
		}),
		(h.tickPadding = function (d) {
			return arguments.length ? ((s = +d), h) : s;
		}),
		(h.offset = function (d) {
			return arguments.length ? ((l = +d), h) : l;
		}),
		h
	);
}
function Hi(t) {
	return Pi(Xn, t);
}
function Yi(t) {
	return Pi(we, t);
}
var Ma = { value: () => {} };
function cr() {
	for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
		if (!(r = arguments[t] + '') || r in n || /[\s.]/.test(r))
			throw new Error('illegal type: ' + r);
		n[r] = [];
	}
	return new Xe(n);
}
function Xe(t) {
	this._ = t;
}
function Ta(t, e) {
	return t
		.trim()
		.split(/^|\s+/)
		.map(function (n) {
			var r = '',
				i = n.indexOf('.');
			if ((i >= 0 && ((r = n.slice(i + 1)), (n = n.slice(0, i))), n && !e.hasOwnProperty(n)))
				throw new Error('unknown type: ' + n);
			return { type: n, name: r };
		});
}
Xe.prototype = cr.prototype = {
	constructor: Xe,
	on: function (t, e) {
		var n = this._,
			r = Ta(t + '', n),
			i,
			o = -1,
			a = r.length;
		if (arguments.length < 2) {
			for (; ++o < a; ) if ((i = (t = r[o]).type) && (i = ka(n[i], t.name))) return i;
			return;
		}
		if (e != null && typeof e != 'function') throw new Error('invalid callback: ' + e);
		for (; ++o < a; )
			if ((i = (t = r[o]).type)) n[i] = Or(n[i], t.name, e);
			else if (e == null) for (i in n) n[i] = Or(n[i], t.name, null);
		return this;
	},
	copy: function () {
		var t = {},
			e = this._;
		for (var n in e) t[n] = e[n].slice();
		return new Xe(t);
	},
	call: function (t, e) {
		if ((i = arguments.length - 2) > 0)
			for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
		for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
	},
	apply: function (t, e, n) {
		if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
		for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
	}
};
function ka(t, e) {
	for (var n = 0, r = t.length, i; n < r; ++n) if ((i = t[n]).name === e) return i.value;
}
function Or(t, e, n) {
	for (var r = 0, i = t.length; r < i; ++r)
		if (t[r].name === e) {
			(t[r] = Ma), (t = t.slice(0, r).concat(t.slice(r + 1)));
			break;
		}
	return n != null && t.push({ name: e, value: n }), t;
}
var Zn = 'http://www.w3.org/1999/xhtml';
const Vr = {
	svg: 'http://www.w3.org/2000/svg',
	xhtml: Zn,
	xlink: 'http://www.w3.org/1999/xlink',
	xml: 'http://www.w3.org/XML/1998/namespace',
	xmlns: 'http://www.w3.org/2000/xmlns/'
};
function _n(t) {
	var e = (t += ''),
		n = e.indexOf(':');
	return (
		n >= 0 && (e = t.slice(0, n)) !== 'xmlns' && (t = t.slice(n + 1)),
		Vr.hasOwnProperty(e) ? { space: Vr[e], local: t } : t
	);
}
function $a(t) {
	return function () {
		var e = this.ownerDocument,
			n = this.namespaceURI;
		return n === Zn && e.documentElement.namespaceURI === Zn
			? e.createElement(t)
			: e.createElementNS(n, t);
	};
}
function Sa(t) {
	return function () {
		return this.ownerDocument.createElementNS(t.space, t.local);
	};
}
function Oi(t) {
	var e = _n(t);
	return (e.local ? Sa : $a)(e);
}
function Ca() {}
function fr(t) {
	return t == null
		? Ca
		: function () {
				return this.querySelector(t);
			};
}
function Da(t) {
	typeof t != 'function' && (t = fr(t));
	for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
		for (var o = e[i], a = o.length, s = (r[i] = new Array(a)), l, u, c = 0; c < a; ++c)
			(l = o[c]) &&
				(u = t.call(l, l.__data__, c, o)) &&
				('__data__' in l && (u.__data__ = l.__data__), (s[c] = u));
	return new dt(r, this._parents);
}
function Na(t) {
	return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Aa() {
	return [];
}
function Vi(t) {
	return t == null
		? Aa
		: function () {
				return this.querySelectorAll(t);
			};
}
function Ea(t) {
	return function () {
		return Na(t.apply(this, arguments));
	};
}
function Ua(t) {
	typeof t == 'function' ? (t = Ea(t)) : (t = Vi(t));
	for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
		for (var a = e[o], s = a.length, l, u = 0; u < s; ++u)
			(l = a[u]) && (r.push(t.call(l, l.__data__, u, a)), i.push(l));
	return new dt(r, i);
}
function qi(t) {
	return function () {
		return this.matches(t);
	};
}
function Bi(t) {
	return function (e) {
		return e.matches(t);
	};
}
var Ia = Array.prototype.find;
function Fa(t) {
	return function () {
		return Ia.call(this.children, t);
	};
}
function Ra() {
	return this.firstElementChild;
}
function za(t) {
	return this.select(t == null ? Ra : Fa(typeof t == 'function' ? t : Bi(t)));
}
var La = Array.prototype.filter;
function Pa() {
	return Array.from(this.children);
}
function Ha(t) {
	return function () {
		return La.call(this.children, t);
	};
}
function Ya(t) {
	return this.selectAll(t == null ? Pa : Ha(typeof t == 'function' ? t : Bi(t)));
}
function Oa(t) {
	typeof t != 'function' && (t = qi(t));
	for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
		for (var o = e[i], a = o.length, s = (r[i] = []), l, u = 0; u < a; ++u)
			(l = o[u]) && t.call(l, l.__data__, u, o) && s.push(l);
	return new dt(r, this._parents);
}
function Wi(t) {
	return new Array(t.length);
}
function Va() {
	return new dt(this._enter || this._groups.map(Wi), this._parents);
}
function an(t, e) {
	(this.ownerDocument = t.ownerDocument),
		(this.namespaceURI = t.namespaceURI),
		(this._next = null),
		(this._parent = t),
		(this.__data__ = e);
}
an.prototype = {
	constructor: an,
	appendChild: function (t) {
		return this._parent.insertBefore(t, this._next);
	},
	insertBefore: function (t, e) {
		return this._parent.insertBefore(t, e);
	},
	querySelector: function (t) {
		return this._parent.querySelector(t);
	},
	querySelectorAll: function (t) {
		return this._parent.querySelectorAll(t);
	}
};
function qa(t) {
	return function () {
		return t;
	};
}
function Ba(t, e, n, r, i, o) {
	for (var a = 0, s, l = e.length, u = o.length; a < u; ++a)
		(s = e[a]) ? ((s.__data__ = o[a]), (r[a] = s)) : (n[a] = new an(t, o[a]));
	for (; a < l; ++a) (s = e[a]) && (i[a] = s);
}
function Wa(t, e, n, r, i, o, a) {
	var s,
		l,
		u = new Map(),
		c = e.length,
		f = o.length,
		h = new Array(c),
		d;
	for (s = 0; s < c; ++s)
		(l = e[s]) &&
			((h[s] = d = a.call(l, l.__data__, s, e) + ''), u.has(d) ? (i[s] = l) : u.set(d, l));
	for (s = 0; s < f; ++s)
		(d = a.call(t, o[s], s, o) + ''),
			(l = u.get(d)) ? ((r[s] = l), (l.__data__ = o[s]), u.delete(d)) : (n[s] = new an(t, o[s]));
	for (s = 0; s < c; ++s) (l = e[s]) && u.get(h[s]) === l && (i[s] = l);
}
function Xa(t) {
	return t.__data__;
}
function Za(t, e) {
	if (!arguments.length) return Array.from(this, Xa);
	var n = e ? Wa : Ba,
		r = this._parents,
		i = this._groups;
	typeof t != 'function' && (t = qa(t));
	for (var o = i.length, a = new Array(o), s = new Array(o), l = new Array(o), u = 0; u < o; ++u) {
		var c = r[u],
			f = i[u],
			h = f.length,
			d = Ga(t.call(c, c && c.__data__, u, r)),
			p = d.length,
			x = (s[u] = new Array(p)),
			_ = (a[u] = new Array(p)),
			g = (l[u] = new Array(h));
		n(c, f, x, _, g, d, e);
		for (var w = 0, $ = 0, F, U; w < p; ++w)
			if ((F = x[w])) {
				for (w >= $ && ($ = w + 1); !(U = _[$]) && ++$ < p; );
				F._next = U || null;
			}
	}
	return (a = new dt(a, r)), (a._enter = s), (a._exit = l), a;
}
function Ga(t) {
	return typeof t == 'object' && 'length' in t ? t : Array.from(t);
}
function Ja() {
	return new dt(this._exit || this._groups.map(Wi), this._parents);
}
function Qa(t, e, n) {
	var r = this.enter(),
		i = this,
		o = this.exit();
	return (
		typeof t == 'function' ? ((r = t(r)), r && (r = r.selection())) : (r = r.append(t + '')),
		e != null && ((i = e(i)), i && (i = i.selection())),
		n == null ? o.remove() : n(o),
		r && i ? r.merge(i).order() : i
	);
}
function Ka(t) {
	for (
		var e = t.selection ? t.selection() : t,
			n = this._groups,
			r = e._groups,
			i = n.length,
			o = r.length,
			a = Math.min(i, o),
			s = new Array(i),
			l = 0;
		l < a;
		++l
	)
		for (var u = n[l], c = r[l], f = u.length, h = (s[l] = new Array(f)), d, p = 0; p < f; ++p)
			(d = u[p] || c[p]) && (h[p] = d);
	for (; l < i; ++l) s[l] = n[l];
	return new dt(s, this._parents);
}
function ja() {
	for (var t = this._groups, e = -1, n = t.length; ++e < n; )
		for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
			(a = r[i]) &&
				(o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), (o = a));
	return this;
}
function tu(t) {
	t || (t = eu);
	function e(f, h) {
		return f && h ? t(f.__data__, h.__data__) : !f - !h;
	}
	for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
		for (var a = n[o], s = a.length, l = (i[o] = new Array(s)), u, c = 0; c < s; ++c)
			(u = a[c]) && (l[c] = u);
		l.sort(e);
	}
	return new dt(i, this._parents).order();
}
function eu(t, e) {
	return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function nu() {
	var t = arguments[0];
	return (arguments[0] = this), t.apply(null, arguments), this;
}
function ru() {
	return Array.from(this);
}
function iu() {
	for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
		for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
			var a = r[i];
			if (a) return a;
		}
	return null;
}
function ou() {
	let t = 0;
	for (const e of this) ++t;
	return t;
}
function au() {
	return !this.node();
}
function uu(t) {
	for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
		for (var i = e[n], o = 0, a = i.length, s; o < a; ++o)
			(s = i[o]) && t.call(s, s.__data__, o, i);
	return this;
}
function su(t) {
	return function () {
		this.removeAttribute(t);
	};
}
function lu(t) {
	return function () {
		this.removeAttributeNS(t.space, t.local);
	};
}
function cu(t, e) {
	return function () {
		this.setAttribute(t, e);
	};
}
function fu(t, e) {
	return function () {
		this.setAttributeNS(t.space, t.local, e);
	};
}
function hu(t, e) {
	return function () {
		var n = e.apply(this, arguments);
		n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
	};
}
function du(t, e) {
	return function () {
		var n = e.apply(this, arguments);
		n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
	};
}
function mu(t, e) {
	var n = _n(t);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each(
		(e == null
			? n.local
				? lu
				: su
			: typeof e == 'function'
				? n.local
					? du
					: hu
				: n.local
					? fu
					: cu)(n, e)
	);
}
function Xi(t) {
	return (t.ownerDocument && t.ownerDocument.defaultView) || (t.document && t) || t.defaultView;
}
function gu(t) {
	return function () {
		this.style.removeProperty(t);
	};
}
function pu(t, e, n) {
	return function () {
		this.style.setProperty(t, e, n);
	};
}
function yu(t, e, n) {
	return function () {
		var r = e.apply(this, arguments);
		r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
	};
}
function _u(t, e, n) {
	return arguments.length > 1
		? this.each((e == null ? gu : typeof e == 'function' ? yu : pu)(t, e, n ?? ''))
		: oe(this.node(), t);
}
function oe(t, e) {
	return t.style.getPropertyValue(e) || Xi(t).getComputedStyle(t, null).getPropertyValue(e);
}
function vu(t) {
	return function () {
		delete this[t];
	};
}
function wu(t, e) {
	return function () {
		this[t] = e;
	};
}
function xu(t, e) {
	return function () {
		var n = e.apply(this, arguments);
		n == null ? delete this[t] : (this[t] = n);
	};
}
function bu(t, e) {
	return arguments.length > 1
		? this.each((e == null ? vu : typeof e == 'function' ? xu : wu)(t, e))
		: this.node()[t];
}
function Zi(t) {
	return t.trim().split(/^|\s+/);
}
function hr(t) {
	return t.classList || new Gi(t);
}
function Gi(t) {
	(this._node = t), (this._names = Zi(t.getAttribute('class') || ''));
}
Gi.prototype = {
	add: function (t) {
		var e = this._names.indexOf(t);
		e < 0 && (this._names.push(t), this._node.setAttribute('class', this._names.join(' ')));
	},
	remove: function (t) {
		var e = this._names.indexOf(t);
		e >= 0 && (this._names.splice(e, 1), this._node.setAttribute('class', this._names.join(' ')));
	},
	contains: function (t) {
		return this._names.indexOf(t) >= 0;
	}
};
function Ji(t, e) {
	for (var n = hr(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Qi(t, e) {
	for (var n = hr(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Mu(t) {
	return function () {
		Ji(this, t);
	};
}
function Tu(t) {
	return function () {
		Qi(this, t);
	};
}
function ku(t, e) {
	return function () {
		(e.apply(this, arguments) ? Ji : Qi)(this, t);
	};
}
function $u(t, e) {
	var n = Zi(t + '');
	if (arguments.length < 2) {
		for (var r = hr(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof e == 'function' ? ku : e ? Mu : Tu)(n, e));
}
function Su() {
	this.textContent = '';
}
function Cu(t) {
	return function () {
		this.textContent = t;
	};
}
function Du(t) {
	return function () {
		var e = t.apply(this, arguments);
		this.textContent = e ?? '';
	};
}
function Nu(t) {
	return arguments.length
		? this.each(t == null ? Su : (typeof t == 'function' ? Du : Cu)(t))
		: this.node().textContent;
}
function Au() {
	this.innerHTML = '';
}
function Eu(t) {
	return function () {
		this.innerHTML = t;
	};
}
function Uu(t) {
	return function () {
		var e = t.apply(this, arguments);
		this.innerHTML = e ?? '';
	};
}
function Iu(t) {
	return arguments.length
		? this.each(t == null ? Au : (typeof t == 'function' ? Uu : Eu)(t))
		: this.node().innerHTML;
}
function Fu() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Ru() {
	return this.each(Fu);
}
function zu() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Lu() {
	return this.each(zu);
}
function Pu(t) {
	var e = typeof t == 'function' ? t : Oi(t);
	return this.select(function () {
		return this.appendChild(e.apply(this, arguments));
	});
}
function Hu() {
	return null;
}
function Yu(t, e) {
	var n = typeof t == 'function' ? t : Oi(t),
		r = e == null ? Hu : typeof e == 'function' ? e : fr(e);
	return this.select(function () {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
function Ou() {
	var t = this.parentNode;
	t && t.removeChild(this);
}
function Vu() {
	return this.each(Ou);
}
function qu() {
	var t = this.cloneNode(!1),
		e = this.parentNode;
	return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Bu() {
	var t = this.cloneNode(!0),
		e = this.parentNode;
	return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Wu(t) {
	return this.select(t ? Bu : qu);
}
function Xu(t) {
	return arguments.length ? this.property('__data__', t) : this.node().__data__;
}
function Zu(t) {
	return function (e) {
		t.call(this, e, this.__data__);
	};
}
function Gu(t) {
	return t
		.trim()
		.split(/^|\s+/)
		.map(function (e) {
			var n = '',
				r = e.indexOf('.');
			return r >= 0 && ((n = e.slice(r + 1)), (e = e.slice(0, r))), { type: e, name: n };
		});
}
function Ju(t) {
	return function () {
		var e = this.__on;
		if (e) {
			for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
				(o = e[n]),
					(!t.type || o.type === t.type) && o.name === t.name
						? this.removeEventListener(o.type, o.listener, o.options)
						: (e[++r] = o);
			++r ? (e.length = r) : delete this.__on;
		}
	};
}
function Qu(t, e, n) {
	return function () {
		var r = this.__on,
			i,
			o = Zu(e);
		if (r) {
			for (var a = 0, s = r.length; a < s; ++a)
				if ((i = r[a]).type === t.type && i.name === t.name) {
					this.removeEventListener(i.type, i.listener, i.options),
						this.addEventListener(i.type, (i.listener = o), (i.options = n)),
						(i.value = e);
					return;
				}
		}
		this.addEventListener(t.type, o, n),
			(i = { type: t.type, name: t.name, value: e, listener: o, options: n }),
			r ? r.push(i) : (this.__on = [i]);
	};
}
function Ku(t, e, n) {
	var r = Gu(t + ''),
		i,
		o = r.length,
		a;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var l = 0, u = s.length, c; l < u; ++l)
				for (i = 0, c = s[l]; i < o; ++i)
					if ((a = r[i]).type === c.type && a.name === c.name) return c.value;
		}
		return;
	}
	for (s = e ? Qu : Ju, i = 0; i < o; ++i) this.each(s(r[i], e, n));
	return this;
}
function Ki(t, e, n) {
	var r = Xi(t),
		i = r.CustomEvent;
	typeof i == 'function'
		? (i = new i(e, n))
		: ((i = r.document.createEvent('Event')),
			n
				? (i.initEvent(e, n.bubbles, n.cancelable), (i.detail = n.detail))
				: i.initEvent(e, !1, !1)),
		t.dispatchEvent(i);
}
function ju(t, e) {
	return function () {
		return Ki(this, t, e);
	};
}
function ts(t, e) {
	return function () {
		return Ki(this, t, e.apply(this, arguments));
	};
}
function es(t, e) {
	return this.each((typeof e == 'function' ? ts : ju)(t, e));
}
function* ns() {
	for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
		for (var r = t[e], i = 0, o = r.length, a; i < o; ++i) (a = r[i]) && (yield a);
}
var ji = [null];
function dt(t, e) {
	(this._groups = t), (this._parents = e);
}
function Le() {
	return new dt([[document.documentElement]], ji);
}
function rs() {
	return this;
}
dt.prototype = Le.prototype = {
	constructor: dt,
	select: Da,
	selectAll: Ua,
	selectChild: za,
	selectChildren: Ya,
	filter: Oa,
	data: Za,
	enter: Va,
	exit: Ja,
	join: Qa,
	merge: Ka,
	selection: rs,
	order: ja,
	sort: tu,
	call: nu,
	nodes: ru,
	node: iu,
	size: ou,
	empty: au,
	each: uu,
	attr: mu,
	style: _u,
	property: bu,
	classed: $u,
	text: Nu,
	html: Iu,
	raise: Ru,
	lower: Lu,
	append: Pu,
	insert: Yu,
	remove: Vu,
	clone: Wu,
	datum: Xu,
	on: Ku,
	dispatch: es,
	[Symbol.iterator]: ns
};
function ht(t) {
	return typeof t == 'string'
		? new dt([[document.querySelector(t)]], [document.documentElement])
		: new dt([[t]], ji);
}
function is(t) {
	let e;
	for (; (e = t.sourceEvent); ) t = e;
	return t;
}
function Ht(t, e) {
	if (((t = is(t)), e === void 0 && (e = t.currentTarget), e)) {
		var n = e.ownerSVGElement || e;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return (
				(r.x = t.clientX),
				(r.y = t.clientY),
				(r = r.matrixTransform(e.getScreenCTM().inverse())),
				[r.x, r.y]
			);
		}
		if (e.getBoundingClientRect) {
			var i = e.getBoundingClientRect();
			return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
		}
	}
	return [t.pageX, t.pageY];
}
const Gn = { capture: !0, passive: !1 };
function Jn(t) {
	t.preventDefault(), t.stopImmediatePropagation();
}
function os(t) {
	var e = t.document.documentElement,
		n = ht(t).on('dragstart.drag', Jn, Gn);
	'onselectstart' in e
		? n.on('selectstart.drag', Jn, Gn)
		: ((e.__noselect = e.style.MozUserSelect), (e.style.MozUserSelect = 'none'));
}
function as(t, e) {
	var n = t.document.documentElement,
		r = ht(t).on('dragstart.drag', null);
	e &&
		(r.on('click.drag', Jn, Gn),
		setTimeout(function () {
			r.on('click.drag', null);
		}, 0)),
		'onselectstart' in n
			? r.on('selectstart.drag', null)
			: ((n.style.MozUserSelect = n.__noselect), delete n.__noselect);
}
function dr(t, e, n) {
	(t.prototype = e.prototype = n), (n.constructor = t);
}
function to(t, e) {
	var n = Object.create(t.prototype);
	for (var r in e) n[r] = e[r];
	return n;
}
function Pe() {}
var Se = 0.7,
	un = 1 / Se,
	ne = '\\s*([+-]?\\d+)\\s*',
	Ce = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
	$t = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
	us = /^#([0-9a-f]{3,8})$/,
	ss = new RegExp(`^rgb\\(${ne},${ne},${ne}\\)$`),
	ls = new RegExp(`^rgb\\(${$t},${$t},${$t}\\)$`),
	cs = new RegExp(`^rgba\\(${ne},${ne},${ne},${Ce}\\)$`),
	fs = new RegExp(`^rgba\\(${$t},${$t},${$t},${Ce}\\)$`),
	hs = new RegExp(`^hsl\\(${Ce},${$t},${$t}\\)$`),
	ds = new RegExp(`^hsla\\(${Ce},${$t},${$t},${Ce}\\)$`),
	qr = {
		aliceblue: 15792383,
		antiquewhite: 16444375,
		aqua: 65535,
		aquamarine: 8388564,
		azure: 15794175,
		beige: 16119260,
		bisque: 16770244,
		black: 0,
		blanchedalmond: 16772045,
		blue: 255,
		blueviolet: 9055202,
		brown: 10824234,
		burlywood: 14596231,
		cadetblue: 6266528,
		chartreuse: 8388352,
		chocolate: 13789470,
		coral: 16744272,
		cornflowerblue: 6591981,
		cornsilk: 16775388,
		crimson: 14423100,
		cyan: 65535,
		darkblue: 139,
		darkcyan: 35723,
		darkgoldenrod: 12092939,
		darkgray: 11119017,
		darkgreen: 25600,
		darkgrey: 11119017,
		darkkhaki: 12433259,
		darkmagenta: 9109643,
		darkolivegreen: 5597999,
		darkorange: 16747520,
		darkorchid: 10040012,
		darkred: 9109504,
		darksalmon: 15308410,
		darkseagreen: 9419919,
		darkslateblue: 4734347,
		darkslategray: 3100495,
		darkslategrey: 3100495,
		darkturquoise: 52945,
		darkviolet: 9699539,
		deeppink: 16716947,
		deepskyblue: 49151,
		dimgray: 6908265,
		dimgrey: 6908265,
		dodgerblue: 2003199,
		firebrick: 11674146,
		floralwhite: 16775920,
		forestgreen: 2263842,
		fuchsia: 16711935,
		gainsboro: 14474460,
		ghostwhite: 16316671,
		gold: 16766720,
		goldenrod: 14329120,
		gray: 8421504,
		green: 32768,
		greenyellow: 11403055,
		grey: 8421504,
		honeydew: 15794160,
		hotpink: 16738740,
		indianred: 13458524,
		indigo: 4915330,
		ivory: 16777200,
		khaki: 15787660,
		lavender: 15132410,
		lavenderblush: 16773365,
		lawngreen: 8190976,
		lemonchiffon: 16775885,
		lightblue: 11393254,
		lightcoral: 15761536,
		lightcyan: 14745599,
		lightgoldenrodyellow: 16448210,
		lightgray: 13882323,
		lightgreen: 9498256,
		lightgrey: 13882323,
		lightpink: 16758465,
		lightsalmon: 16752762,
		lightseagreen: 2142890,
		lightskyblue: 8900346,
		lightslategray: 7833753,
		lightslategrey: 7833753,
		lightsteelblue: 11584734,
		lightyellow: 16777184,
		lime: 65280,
		limegreen: 3329330,
		linen: 16445670,
		magenta: 16711935,
		maroon: 8388608,
		mediumaquamarine: 6737322,
		mediumblue: 205,
		mediumorchid: 12211667,
		mediumpurple: 9662683,
		mediumseagreen: 3978097,
		mediumslateblue: 8087790,
		mediumspringgreen: 64154,
		mediumturquoise: 4772300,
		mediumvioletred: 13047173,
		midnightblue: 1644912,
		mintcream: 16121850,
		mistyrose: 16770273,
		moccasin: 16770229,
		navajowhite: 16768685,
		navy: 128,
		oldlace: 16643558,
		olive: 8421376,
		olivedrab: 7048739,
		orange: 16753920,
		orangered: 16729344,
		orchid: 14315734,
		palegoldenrod: 15657130,
		palegreen: 10025880,
		paleturquoise: 11529966,
		palevioletred: 14381203,
		papayawhip: 16773077,
		peachpuff: 16767673,
		peru: 13468991,
		pink: 16761035,
		plum: 14524637,
		powderblue: 11591910,
		purple: 8388736,
		rebeccapurple: 6697881,
		red: 16711680,
		rosybrown: 12357519,
		royalblue: 4286945,
		saddlebrown: 9127187,
		salmon: 16416882,
		sandybrown: 16032864,
		seagreen: 3050327,
		seashell: 16774638,
		sienna: 10506797,
		silver: 12632256,
		skyblue: 8900331,
		slateblue: 6970061,
		slategray: 7372944,
		slategrey: 7372944,
		snow: 16775930,
		springgreen: 65407,
		steelblue: 4620980,
		tan: 13808780,
		teal: 32896,
		thistle: 14204888,
		tomato: 16737095,
		turquoise: 4251856,
		violet: 15631086,
		wheat: 16113331,
		white: 16777215,
		whitesmoke: 16119285,
		yellow: 16776960,
		yellowgreen: 10145074
	};
dr(Pe, Wt, {
	copy(t) {
		return Object.assign(new this.constructor(), this, t);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Br,
	formatHex: Br,
	formatHex8: ms,
	formatHsl: gs,
	formatRgb: Wr,
	toString: Wr
});
function Br() {
	return this.rgb().formatHex();
}
function ms() {
	return this.rgb().formatHex8();
}
function gs() {
	return eo(this).formatHsl();
}
function Wr() {
	return this.rgb().formatRgb();
}
function Wt(t) {
	var e, n;
	return (
		(t = (t + '').trim().toLowerCase()),
		(e = us.exec(t))
			? ((n = e[1].length),
				(e = parseInt(e[1], 16)),
				n === 6
					? Xr(e)
					: n === 3
						? new ut(
								((e >> 8) & 15) | ((e >> 4) & 240),
								((e >> 4) & 15) | (e & 240),
								((e & 15) << 4) | (e & 15),
								1
							)
						: n === 8
							? Ye((e >> 24) & 255, (e >> 16) & 255, (e >> 8) & 255, (e & 255) / 255)
							: n === 4
								? Ye(
										((e >> 12) & 15) | ((e >> 8) & 240),
										((e >> 8) & 15) | ((e >> 4) & 240),
										((e >> 4) & 15) | (e & 240),
										(((e & 15) << 4) | (e & 15)) / 255
									)
								: null)
			: (e = ss.exec(t))
				? new ut(e[1], e[2], e[3], 1)
				: (e = ls.exec(t))
					? new ut((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, 1)
					: (e = cs.exec(t))
						? Ye(e[1], e[2], e[3], e[4])
						: (e = fs.exec(t))
							? Ye((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, e[4])
							: (e = hs.exec(t))
								? Jr(e[1], e[2] / 100, e[3] / 100, 1)
								: (e = ds.exec(t))
									? Jr(e[1], e[2] / 100, e[3] / 100, e[4])
									: qr.hasOwnProperty(t)
										? Xr(qr[t])
										: t === 'transparent'
											? new ut(NaN, NaN, NaN, 0)
											: null
	);
}
function Xr(t) {
	return new ut((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function Ye(t, e, n, r) {
	return r <= 0 && (t = e = n = NaN), new ut(t, e, n, r);
}
function ps(t) {
	return (
		t instanceof Pe || (t = Wt(t)), t ? ((t = t.rgb()), new ut(t.r, t.g, t.b, t.opacity)) : new ut()
	);
}
function Qn(t, e, n, r) {
	return arguments.length === 1 ? ps(t) : new ut(t, e, n, r ?? 1);
}
function ut(t, e, n, r) {
	(this.r = +t), (this.g = +e), (this.b = +n), (this.opacity = +r);
}
dr(
	ut,
	Qn,
	to(Pe, {
		brighter(t) {
			return (
				(t = t == null ? un : Math.pow(un, t)),
				new ut(this.r * t, this.g * t, this.b * t, this.opacity)
			);
		},
		darker(t) {
			return (
				(t = t == null ? Se : Math.pow(Se, t)),
				new ut(this.r * t, this.g * t, this.b * t, this.opacity)
			);
		},
		rgb() {
			return this;
		},
		clamp() {
			return new ut(qt(this.r), qt(this.g), qt(this.b), sn(this.opacity));
		},
		displayable() {
			return (
				-0.5 <= this.r &&
				this.r < 255.5 &&
				-0.5 <= this.g &&
				this.g < 255.5 &&
				-0.5 <= this.b &&
				this.b < 255.5 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		hex: Zr,
		formatHex: Zr,
		formatHex8: ys,
		formatRgb: Gr,
		toString: Gr
	})
);
function Zr() {
	return `#${Vt(this.r)}${Vt(this.g)}${Vt(this.b)}`;
}
function ys() {
	return `#${Vt(this.r)}${Vt(this.g)}${Vt(this.b)}${Vt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Gr() {
	const t = sn(this.opacity);
	return `${t === 1 ? 'rgb(' : 'rgba('}${qt(this.r)}, ${qt(this.g)}, ${qt(this.b)}${t === 1 ? ')' : `, ${t})`}`;
}
function sn(t) {
	return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function qt(t) {
	return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Vt(t) {
	return (t = qt(t)), (t < 16 ? '0' : '') + t.toString(16);
}
function Jr(t, e, n, r) {
	return (
		r <= 0 ? (t = e = n = NaN) : n <= 0 || n >= 1 ? (t = e = NaN) : e <= 0 && (t = NaN),
		new vt(t, e, n, r)
	);
}
function eo(t) {
	if (t instanceof vt) return new vt(t.h, t.s, t.l, t.opacity);
	if ((t instanceof Pe || (t = Wt(t)), !t)) return new vt();
	if (t instanceof vt) return t;
	t = t.rgb();
	var e = t.r / 255,
		n = t.g / 255,
		r = t.b / 255,
		i = Math.min(e, n, r),
		o = Math.max(e, n, r),
		a = NaN,
		s = o - i,
		l = (o + i) / 2;
	return (
		s
			? (e === o
					? (a = (n - r) / s + (n < r) * 6)
					: n === o
						? (a = (r - e) / s + 2)
						: (a = (e - n) / s + 4),
				(s /= l < 0.5 ? o + i : 2 - o - i),
				(a *= 60))
			: (s = l > 0 && l < 1 ? 0 : a),
		new vt(a, s, l, t.opacity)
	);
}
function _s(t, e, n, r) {
	return arguments.length === 1 ? eo(t) : new vt(t, e, n, r ?? 1);
}
function vt(t, e, n, r) {
	(this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r);
}
dr(
	vt,
	_s,
	to(Pe, {
		brighter(t) {
			return (
				(t = t == null ? un : Math.pow(un, t)), new vt(this.h, this.s, this.l * t, this.opacity)
			);
		},
		darker(t) {
			return (
				(t = t == null ? Se : Math.pow(Se, t)), new vt(this.h, this.s, this.l * t, this.opacity)
			);
		},
		rgb() {
			var t = (this.h % 360) + (this.h < 0) * 360,
				e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
				n = this.l,
				r = n + (n < 0.5 ? n : 1 - n) * e,
				i = 2 * n - r;
			return new ut(
				Cn(t >= 240 ? t - 240 : t + 120, i, r),
				Cn(t, i, r),
				Cn(t < 120 ? t + 240 : t - 120, i, r),
				this.opacity
			);
		},
		clamp() {
			return new vt(Qr(this.h), Oe(this.s), Oe(this.l), sn(this.opacity));
		},
		displayable() {
			return (
				((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
				0 <= this.l &&
				this.l <= 1 &&
				0 <= this.opacity &&
				this.opacity <= 1
			);
		},
		formatHsl() {
			const t = sn(this.opacity);
			return `${t === 1 ? 'hsl(' : 'hsla('}${Qr(this.h)}, ${Oe(this.s) * 100}%, ${Oe(this.l) * 100}%${t === 1 ? ')' : `, ${t})`}`;
		}
	})
);
function Qr(t) {
	return (t = (t || 0) % 360), t < 0 ? t + 360 : t;
}
function Oe(t) {
	return Math.max(0, Math.min(1, t || 0));
}
function Cn(t, e, n) {
	return (
		(t < 60 ? e + ((n - e) * t) / 60 : t < 180 ? n : t < 240 ? e + ((n - e) * (240 - t)) / 60 : e) *
		255
	);
}
const mr = (t) => () => t;
function vs(t, e) {
	return function (n) {
		return t + n * e;
	};
}
function ws(t, e, n) {
	return (
		(t = Math.pow(t, n)),
		(e = Math.pow(e, n) - t),
		(n = 1 / n),
		function (r) {
			return Math.pow(t + r * e, n);
		}
	);
}
function xs(t) {
	return (t = +t) == 1
		? no
		: function (e, n) {
				return n - e ? ws(e, n, t) : mr(isNaN(e) ? n : e);
			};
}
function no(t, e) {
	var n = e - t;
	return n ? vs(t, n) : mr(isNaN(t) ? e : t);
}
const ln = (function t(e) {
	var n = xs(e);
	function r(i, o) {
		var a = n((i = Qn(i)).r, (o = Qn(o)).r),
			s = n(i.g, o.g),
			l = n(i.b, o.b),
			u = no(i.opacity, o.opacity);
		return function (c) {
			return (i.r = a(c)), (i.g = s(c)), (i.b = l(c)), (i.opacity = u(c)), i + '';
		};
	}
	return (r.gamma = t), r;
})(1);
function bs(t, e) {
	e || (e = []);
	var n = t ? Math.min(e.length, t.length) : 0,
		r = e.slice(),
		i;
	return function (o) {
		for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
		return r;
	};
}
function Ms(t) {
	return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Ts(t, e) {
	var n = e ? e.length : 0,
		r = t ? Math.min(n, t.length) : 0,
		i = new Array(r),
		o = new Array(n),
		a;
	for (a = 0; a < r; ++a) i[a] = gr(t[a], e[a]);
	for (; a < n; ++a) o[a] = e[a];
	return function (s) {
		for (a = 0; a < r; ++a) o[a] = i[a](s);
		return o;
	};
}
function ks(t, e) {
	var n = new Date();
	return (
		(t = +t),
		(e = +e),
		function (r) {
			return n.setTime(t * (1 - r) + e * r), n;
		}
	);
}
function _t(t, e) {
	return (
		(t = +t),
		(e = +e),
		function (n) {
			return t * (1 - n) + e * n;
		}
	);
}
function $s(t, e) {
	var n = {},
		r = {},
		i;
	(t === null || typeof t != 'object') && (t = {}),
		(e === null || typeof e != 'object') && (e = {});
	for (i in e) i in t ? (n[i] = gr(t[i], e[i])) : (r[i] = e[i]);
	return function (o) {
		for (i in n) r[i] = n[i](o);
		return r;
	};
}
var Kn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
	Dn = new RegExp(Kn.source, 'g');
function Ss(t) {
	return function () {
		return t;
	};
}
function Cs(t) {
	return function (e) {
		return t(e) + '';
	};
}
function ro(t, e) {
	var n = (Kn.lastIndex = Dn.lastIndex = 0),
		r,
		i,
		o,
		a = -1,
		s = [],
		l = [];
	for (t = t + '', e = e + ''; (r = Kn.exec(t)) && (i = Dn.exec(e)); )
		(o = i.index) > n && ((o = e.slice(n, o)), s[a] ? (s[a] += o) : (s[++a] = o)),
			(r = r[0]) === (i = i[0])
				? s[a]
					? (s[a] += i)
					: (s[++a] = i)
				: ((s[++a] = null), l.push({ i: a, x: _t(r, i) })),
			(n = Dn.lastIndex);
	return (
		n < e.length && ((o = e.slice(n)), s[a] ? (s[a] += o) : (s[++a] = o)),
		s.length < 2
			? l[0]
				? Cs(l[0].x)
				: Ss(e)
			: ((e = l.length),
				function (u) {
					for (var c = 0, f; c < e; ++c) s[(f = l[c]).i] = f.x(u);
					return s.join('');
				})
	);
}
function gr(t, e) {
	var n = typeof e,
		r;
	return e == null || n === 'boolean'
		? mr(e)
		: (n === 'number'
				? _t
				: n === 'string'
					? (r = Wt(e))
						? ((e = r), ln)
						: ro
					: e instanceof Wt
						? ln
						: e instanceof Date
							? ks
							: Ms(e)
								? bs
								: Array.isArray(e)
									? Ts
									: (typeof e.valueOf != 'function' && typeof e.toString != 'function') || isNaN(e)
										? $s
										: _t)(t, e);
}
function Ds(t, e) {
	return (
		(t = +t),
		(e = +e),
		function (n) {
			return Math.round(t * (1 - n) + e * n);
		}
	);
}
var Kr = 180 / Math.PI,
	jn = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
function io(t, e, n, r, i, o) {
	var a, s, l;
	return (
		(a = Math.sqrt(t * t + e * e)) && ((t /= a), (e /= a)),
		(l = t * n + e * r) && ((n -= t * l), (r -= e * l)),
		(s = Math.sqrt(n * n + r * r)) && ((n /= s), (r /= s), (l /= s)),
		t * r < e * n && ((t = -t), (e = -e), (l = -l), (a = -a)),
		{
			translateX: i,
			translateY: o,
			rotate: Math.atan2(e, t) * Kr,
			skewX: Math.atan(l) * Kr,
			scaleX: a,
			scaleY: s
		}
	);
}
var Ve;
function Ns(t) {
	const e = new (typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix)(t + '');
	return e.isIdentity ? jn : io(e.a, e.b, e.c, e.d, e.e, e.f);
}
function As(t) {
	return t == null ||
		(Ve || (Ve = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
		Ve.setAttribute('transform', t),
		!(t = Ve.transform.baseVal.consolidate()))
		? jn
		: ((t = t.matrix), io(t.a, t.b, t.c, t.d, t.e, t.f));
}
function oo(t, e, n, r) {
	function i(u) {
		return u.length ? u.pop() + ' ' : '';
	}
	function o(u, c, f, h, d, p) {
		if (u !== f || c !== h) {
			var x = d.push('translate(', null, e, null, n);
			p.push({ i: x - 4, x: _t(u, f) }, { i: x - 2, x: _t(c, h) });
		} else (f || h) && d.push('translate(' + f + e + h + n);
	}
	function a(u, c, f, h) {
		u !== c
			? (u - c > 180 ? (c += 360) : c - u > 180 && (u += 360),
				h.push({ i: f.push(i(f) + 'rotate(', null, r) - 2, x: _t(u, c) }))
			: c && f.push(i(f) + 'rotate(' + c + r);
	}
	function s(u, c, f, h) {
		u !== c
			? h.push({ i: f.push(i(f) + 'skewX(', null, r) - 2, x: _t(u, c) })
			: c && f.push(i(f) + 'skewX(' + c + r);
	}
	function l(u, c, f, h, d, p) {
		if (u !== f || c !== h) {
			var x = d.push(i(d) + 'scale(', null, ',', null, ')');
			p.push({ i: x - 4, x: _t(u, f) }, { i: x - 2, x: _t(c, h) });
		} else (f !== 1 || h !== 1) && d.push(i(d) + 'scale(' + f + ',' + h + ')');
	}
	return function (u, c) {
		var f = [],
			h = [];
		return (
			(u = t(u)),
			(c = t(c)),
			o(u.translateX, u.translateY, c.translateX, c.translateY, f, h),
			a(u.rotate, c.rotate, f, h),
			s(u.skewX, c.skewX, f, h),
			l(u.scaleX, u.scaleY, c.scaleX, c.scaleY, f, h),
			(u = c = null),
			function (d) {
				for (var p = -1, x = h.length, _; ++p < x; ) f[(_ = h[p]).i] = _.x(d);
				return f.join('');
			}
		);
	};
}
var Es = oo(Ns, 'px, ', 'px)', 'deg)'),
	Us = oo(As, ', ', ')', ')'),
	Is = 1e-12;
function jr(t) {
	return ((t = Math.exp(t)) + 1 / t) / 2;
}
function Fs(t) {
	return ((t = Math.exp(t)) - 1 / t) / 2;
}
function Rs(t) {
	return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const zs = (function t(e, n, r) {
	function i(o, a) {
		var s = o[0],
			l = o[1],
			u = o[2],
			c = a[0],
			f = a[1],
			h = a[2],
			d = c - s,
			p = f - l,
			x = d * d + p * p,
			_,
			g;
		if (x < Is)
			(g = Math.log(h / u) / e),
				(_ = function (C) {
					return [s + C * d, l + C * p, u * Math.exp(e * C * g)];
				});
		else {
			var w = Math.sqrt(x),
				$ = (h * h - u * u + r * x) / (2 * u * n * w),
				F = (h * h - u * u - r * x) / (2 * h * n * w),
				U = Math.log(Math.sqrt($ * $ + 1) - $),
				M = Math.log(Math.sqrt(F * F + 1) - F);
			(g = (M - U) / e),
				(_ = function (C) {
					var I = C * g,
						L = jr(U),
						O = (u / (n * w)) * (L * Rs(e * I + U) - Fs(U));
					return [s + O * d, l + O * p, (u * L) / jr(e * I + U)];
				});
		}
		return (_.duration = (g * 1e3 * e) / Math.SQRT2), _;
	}
	return (
		(i.rho = function (o) {
			var a = Math.max(0.001, +o),
				s = a * a,
				l = s * s;
			return t(a, s, l);
		}),
		i
	);
})(Math.SQRT2, 2, 4);
var ae = 0,
	xe = 0,
	fe = 0,
	ao = 1e3,
	cn,
	be,
	fn = 0,
	Xt = 0,
	vn = 0,
	De = typeof performance == 'object' && performance.now ? performance : Date,
	uo =
		typeof window == 'object' && window.requestAnimationFrame
			? window.requestAnimationFrame.bind(window)
			: function (t) {
					setTimeout(t, 17);
				};
function pr() {
	return Xt || (uo(Ls), (Xt = De.now() + vn));
}
function Ls() {
	Xt = 0;
}
function hn() {
	this._call = this._time = this._next = null;
}
hn.prototype = so.prototype = {
	constructor: hn,
	restart: function (t, e, n) {
		if (typeof t != 'function') throw new TypeError('callback is not a function');
		(n = (n == null ? pr() : +n) + (e == null ? 0 : +e)),
			!this._next && be !== this && (be ? (be._next = this) : (cn = this), (be = this)),
			(this._call = t),
			(this._time = n),
			tr();
	},
	stop: function () {
		this._call && ((this._call = null), (this._time = 1 / 0), tr());
	}
};
function so(t, e, n) {
	var r = new hn();
	return r.restart(t, e, n), r;
}
function Ps() {
	pr(), ++ae;
	for (var t = cn, e; t; ) (e = Xt - t._time) >= 0 && t._call.call(void 0, e), (t = t._next);
	--ae;
}
function ti() {
	(Xt = (fn = De.now()) + vn), (ae = xe = 0);
	try {
		Ps();
	} finally {
		(ae = 0), Ys(), (Xt = 0);
	}
}
function Hs() {
	var t = De.now(),
		e = t - fn;
	e > ao && ((vn -= e), (fn = t));
}
function Ys() {
	for (var t, e = cn, n, r = 1 / 0; e; )
		e._call
			? (r > e._time && (r = e._time), (t = e), (e = e._next))
			: ((n = e._next), (e._next = null), (e = t ? (t._next = n) : (cn = n)));
	(be = t), tr(r);
}
function tr(t) {
	if (!ae) {
		xe && (xe = clearTimeout(xe));
		var e = t - Xt;
		e > 24
			? (t < 1 / 0 && (xe = setTimeout(ti, t - De.now() - vn)), fe && (fe = clearInterval(fe)))
			: (fe || ((fn = De.now()), (fe = setInterval(Hs, ao))), (ae = 1), uo(ti));
	}
}
function ei(t, e, n) {
	var r = new hn();
	return (
		(e = e == null ? 0 : +e),
		r.restart(
			(i) => {
				r.stop(), t(i + e);
			},
			e,
			n
		),
		r
	);
}
var Os = cr('start', 'end', 'cancel', 'interrupt'),
	Vs = [],
	lo = 0,
	ni = 1,
	er = 2,
	Ze = 3,
	ri = 4,
	nr = 5,
	Ge = 6;
function wn(t, e, n, r, i, o) {
	var a = t.__transition;
	if (!a) t.__transition = {};
	else if (n in a) return;
	qs(t, n, {
		name: e,
		index: r,
		group: i,
		on: Os,
		tween: Vs,
		time: o.time,
		delay: o.delay,
		duration: o.duration,
		ease: o.ease,
		timer: null,
		state: lo
	});
}
function yr(t, e) {
	var n = Mt(t, e);
	if (n.state > lo) throw new Error('too late; already scheduled');
	return n;
}
function St(t, e) {
	var n = Mt(t, e);
	if (n.state > Ze) throw new Error('too late; already running');
	return n;
}
function Mt(t, e) {
	var n = t.__transition;
	if (!n || !(n = n[e])) throw new Error('transition not found');
	return n;
}
function qs(t, e, n) {
	var r = t.__transition,
		i;
	(r[e] = n), (n.timer = so(o, 0, n.time));
	function o(u) {
		(n.state = ni), n.timer.restart(a, n.delay, n.time), n.delay <= u && a(u - n.delay);
	}
	function a(u) {
		var c, f, h, d;
		if (n.state !== ni) return l();
		for (c in r)
			if (((d = r[c]), d.name === n.name)) {
				if (d.state === Ze) return ei(a);
				d.state === ri
					? ((d.state = Ge),
						d.timer.stop(),
						d.on.call('interrupt', t, t.__data__, d.index, d.group),
						delete r[c])
					: +c < e &&
						((d.state = Ge),
						d.timer.stop(),
						d.on.call('cancel', t, t.__data__, d.index, d.group),
						delete r[c]);
			}
		if (
			(ei(function () {
				n.state === Ze && ((n.state = ri), n.timer.restart(s, n.delay, n.time), s(u));
			}),
			(n.state = er),
			n.on.call('start', t, t.__data__, n.index, n.group),
			n.state === er)
		) {
			for (n.state = Ze, i = new Array((h = n.tween.length)), c = 0, f = -1; c < h; ++c)
				(d = n.tween[c].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
			i.length = f + 1;
		}
	}
	function s(u) {
		for (
			var c =
					u < n.duration
						? n.ease.call(null, u / n.duration)
						: (n.timer.restart(l), (n.state = nr), 1),
				f = -1,
				h = i.length;
			++f < h;

		)
			i[f].call(t, c);
		n.state === nr && (n.on.call('end', t, t.__data__, n.index, n.group), l());
	}
	function l() {
		(n.state = Ge), n.timer.stop(), delete r[e];
		for (var u in r) return;
		delete t.__transition;
	}
}
function Je(t, e) {
	var n = t.__transition,
		r,
		i,
		o = !0,
		a;
	if (n) {
		e = e == null ? null : e + '';
		for (a in n) {
			if ((r = n[a]).name !== e) {
				o = !1;
				continue;
			}
			(i = r.state > er && r.state < nr),
				(r.state = Ge),
				r.timer.stop(),
				r.on.call(i ? 'interrupt' : 'cancel', t, t.__data__, r.index, r.group),
				delete n[a];
		}
		o && delete t.__transition;
	}
}
function Bs(t) {
	return this.each(function () {
		Je(this, t);
	});
}
function Ws(t, e) {
	var n, r;
	return function () {
		var i = St(this, t),
			o = i.tween;
		if (o !== n) {
			r = n = o;
			for (var a = 0, s = r.length; a < s; ++a)
				if (r[a].name === e) {
					(r = r.slice()), r.splice(a, 1);
					break;
				}
		}
		i.tween = r;
	};
}
function Xs(t, e, n) {
	var r, i;
	if (typeof n != 'function') throw new Error();
	return function () {
		var o = St(this, t),
			a = o.tween;
		if (a !== r) {
			i = (r = a).slice();
			for (var s = { name: e, value: n }, l = 0, u = i.length; l < u; ++l)
				if (i[l].name === e) {
					i[l] = s;
					break;
				}
			l === u && i.push(s);
		}
		o.tween = i;
	};
}
function Zs(t, e) {
	var n = this._id;
	if (((t += ''), arguments.length < 2)) {
		for (var r = Mt(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
			if ((a = r[i]).name === t) return a.value;
		return null;
	}
	return this.each((e == null ? Ws : Xs)(n, t, e));
}
function _r(t, e, n) {
	var r = t._id;
	return (
		t.each(function () {
			var i = St(this, r);
			(i.value || (i.value = {}))[e] = n.apply(this, arguments);
		}),
		function (i) {
			return Mt(i, r).value[e];
		}
	);
}
function co(t, e) {
	var n;
	return (typeof e == 'number' ? _t : e instanceof Wt ? ln : (n = Wt(e)) ? ((e = n), ln) : ro)(
		t,
		e
	);
}
function Gs(t) {
	return function () {
		this.removeAttribute(t);
	};
}
function Js(t) {
	return function () {
		this.removeAttributeNS(t.space, t.local);
	};
}
function Qs(t, e, n) {
	var r,
		i = n + '',
		o;
	return function () {
		var a = this.getAttribute(t);
		return a === i ? null : a === r ? o : (o = e((r = a), n));
	};
}
function Ks(t, e, n) {
	var r,
		i = n + '',
		o;
	return function () {
		var a = this.getAttributeNS(t.space, t.local);
		return a === i ? null : a === r ? o : (o = e((r = a), n));
	};
}
function js(t, e, n) {
	var r, i, o;
	return function () {
		var a,
			s = n(this),
			l;
		return s == null
			? void this.removeAttribute(t)
			: ((a = this.getAttribute(t)),
				(l = s + ''),
				a === l ? null : a === r && l === i ? o : ((i = l), (o = e((r = a), s))));
	};
}
function tl(t, e, n) {
	var r, i, o;
	return function () {
		var a,
			s = n(this),
			l;
		return s == null
			? void this.removeAttributeNS(t.space, t.local)
			: ((a = this.getAttributeNS(t.space, t.local)),
				(l = s + ''),
				a === l ? null : a === r && l === i ? o : ((i = l), (o = e((r = a), s))));
	};
}
function el(t, e) {
	var n = _n(t),
		r = n === 'transform' ? Us : co;
	return this.attrTween(
		t,
		typeof e == 'function'
			? (n.local ? tl : js)(n, r, _r(this, 'attr.' + t, e))
			: e == null
				? (n.local ? Js : Gs)(n)
				: (n.local ? Ks : Qs)(n, r, e)
	);
}
function nl(t, e) {
	return function (n) {
		this.setAttribute(t, e.call(this, n));
	};
}
function rl(t, e) {
	return function (n) {
		this.setAttributeNS(t.space, t.local, e.call(this, n));
	};
}
function il(t, e) {
	var n, r;
	function i() {
		var o = e.apply(this, arguments);
		return o !== r && (n = (r = o) && rl(t, o)), n;
	}
	return (i._value = e), i;
}
function ol(t, e) {
	var n, r;
	function i() {
		var o = e.apply(this, arguments);
		return o !== r && (n = (r = o) && nl(t, o)), n;
	}
	return (i._value = e), i;
}
function al(t, e) {
	var n = 'attr.' + t;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (e == null) return this.tween(n, null);
	if (typeof e != 'function') throw new Error();
	var r = _n(t);
	return this.tween(n, (r.local ? il : ol)(r, e));
}
function ul(t, e) {
	return function () {
		yr(this, t).delay = +e.apply(this, arguments);
	};
}
function sl(t, e) {
	return (
		(e = +e),
		function () {
			yr(this, t).delay = e;
		}
	);
}
function ll(t) {
	var e = this._id;
	return arguments.length
		? this.each((typeof t == 'function' ? ul : sl)(e, t))
		: Mt(this.node(), e).delay;
}
function cl(t, e) {
	return function () {
		St(this, t).duration = +e.apply(this, arguments);
	};
}
function fl(t, e) {
	return (
		(e = +e),
		function () {
			St(this, t).duration = e;
		}
	);
}
function hl(t) {
	var e = this._id;
	return arguments.length
		? this.each((typeof t == 'function' ? cl : fl)(e, t))
		: Mt(this.node(), e).duration;
}
function dl(t, e) {
	if (typeof e != 'function') throw new Error();
	return function () {
		St(this, t).ease = e;
	};
}
function ml(t) {
	var e = this._id;
	return arguments.length ? this.each(dl(e, t)) : Mt(this.node(), e).ease;
}
function gl(t, e) {
	return function () {
		var n = e.apply(this, arguments);
		if (typeof n != 'function') throw new Error();
		St(this, t).ease = n;
	};
}
function pl(t) {
	if (typeof t != 'function') throw new Error();
	return this.each(gl(this._id, t));
}
function yl(t) {
	typeof t != 'function' && (t = qi(t));
	for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
		for (var o = e[i], a = o.length, s = (r[i] = []), l, u = 0; u < a; ++u)
			(l = o[u]) && t.call(l, l.__data__, u, o) && s.push(l);
	return new Ft(r, this._parents, this._name, this._id);
}
function _l(t) {
	if (t._id !== this._id) throw new Error();
	for (
		var e = this._groups,
			n = t._groups,
			r = e.length,
			i = n.length,
			o = Math.min(r, i),
			a = new Array(r),
			s = 0;
		s < o;
		++s
	)
		for (var l = e[s], u = n[s], c = l.length, f = (a[s] = new Array(c)), h, d = 0; d < c; ++d)
			(h = l[d] || u[d]) && (f[d] = h);
	for (; s < r; ++s) a[s] = e[s];
	return new Ft(a, this._parents, this._name, this._id);
}
function vl(t) {
	return (t + '')
		.trim()
		.split(/^|\s+/)
		.every(function (e) {
			var n = e.indexOf('.');
			return n >= 0 && (e = e.slice(0, n)), !e || e === 'start';
		});
}
function wl(t, e, n) {
	var r,
		i,
		o = vl(e) ? yr : St;
	return function () {
		var a = o(this, t),
			s = a.on;
		s !== r && (i = (r = s).copy()).on(e, n), (a.on = i);
	};
}
function xl(t, e) {
	var n = this._id;
	return arguments.length < 2 ? Mt(this.node(), n).on.on(t) : this.each(wl(n, t, e));
}
function bl(t) {
	return function () {
		var e = this.parentNode;
		for (var n in this.__transition) if (+n !== t) return;
		e && e.removeChild(this);
	};
}
function Ml() {
	return this.on('end.remove', bl(this._id));
}
function Tl(t) {
	var e = this._name,
		n = this._id;
	typeof t != 'function' && (t = fr(t));
	for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
		for (var s = r[a], l = s.length, u = (o[a] = new Array(l)), c, f, h = 0; h < l; ++h)
			(c = s[h]) &&
				(f = t.call(c, c.__data__, h, s)) &&
				('__data__' in c && (f.__data__ = c.__data__), (u[h] = f), wn(u[h], e, n, h, u, Mt(c, n)));
	return new Ft(o, this._parents, e, n);
}
function kl(t) {
	var e = this._name,
		n = this._id;
	typeof t != 'function' && (t = Vi(t));
	for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
		for (var l = r[s], u = l.length, c, f = 0; f < u; ++f)
			if ((c = l[f])) {
				for (var h = t.call(c, c.__data__, f, l), d, p = Mt(c, n), x = 0, _ = h.length; x < _; ++x)
					(d = h[x]) && wn(d, e, n, x, h, p);
				o.push(h), a.push(c);
			}
	return new Ft(o, a, e, n);
}
var $l = Le.prototype.constructor;
function Sl() {
	return new $l(this._groups, this._parents);
}
function Cl(t, e) {
	var n, r, i;
	return function () {
		var o = oe(this, t),
			a = (this.style.removeProperty(t), oe(this, t));
		return o === a ? null : o === n && a === r ? i : (i = e((n = o), (r = a)));
	};
}
function fo(t) {
	return function () {
		this.style.removeProperty(t);
	};
}
function Dl(t, e, n) {
	var r,
		i = n + '',
		o;
	return function () {
		var a = oe(this, t);
		return a === i ? null : a === r ? o : (o = e((r = a), n));
	};
}
function Nl(t, e, n) {
	var r, i, o;
	return function () {
		var a = oe(this, t),
			s = n(this),
			l = s + '';
		return (
			s == null && (l = s = (this.style.removeProperty(t), oe(this, t))),
			a === l ? null : a === r && l === i ? o : ((i = l), (o = e((r = a), s)))
		);
	};
}
function Al(t, e) {
	var n,
		r,
		i,
		o = 'style.' + e,
		a = 'end.' + o,
		s;
	return function () {
		var l = St(this, t),
			u = l.on,
			c = l.value[o] == null ? s || (s = fo(e)) : void 0;
		(u !== n || i !== c) && (r = (n = u).copy()).on(a, (i = c)), (l.on = r);
	};
}
function El(t, e, n) {
	var r = (t += '') == 'transform' ? Es : co;
	return e == null
		? this.styleTween(t, Cl(t, r)).on('end.style.' + t, fo(t))
		: typeof e == 'function'
			? this.styleTween(t, Nl(t, r, _r(this, 'style.' + t, e))).each(Al(this._id, t))
			: this.styleTween(t, Dl(t, r, e), n).on('end.style.' + t, null);
}
function Ul(t, e, n) {
	return function (r) {
		this.style.setProperty(t, e.call(this, r), n);
	};
}
function Il(t, e, n) {
	var r, i;
	function o() {
		var a = e.apply(this, arguments);
		return a !== i && (r = (i = a) && Ul(t, a, n)), r;
	}
	return (o._value = e), o;
}
function Fl(t, e, n) {
	var r = 'style.' + (t += '');
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (e == null) return this.tween(r, null);
	if (typeof e != 'function') throw new Error();
	return this.tween(r, Il(t, e, n ?? ''));
}
function Rl(t) {
	return function () {
		this.textContent = t;
	};
}
function zl(t) {
	return function () {
		var e = t(this);
		this.textContent = e ?? '';
	};
}
function Ll(t) {
	return this.tween(
		'text',
		typeof t == 'function' ? zl(_r(this, 'text', t)) : Rl(t == null ? '' : t + '')
	);
}
function Pl(t) {
	return function (e) {
		this.textContent = t.call(this, e);
	};
}
function Hl(t) {
	var e, n;
	function r() {
		var i = t.apply(this, arguments);
		return i !== n && (e = (n = i) && Pl(i)), e;
	}
	return (r._value = t), r;
}
function Yl(t) {
	var e = 'text';
	if (arguments.length < 1) return (e = this.tween(e)) && e._value;
	if (t == null) return this.tween(e, null);
	if (typeof t != 'function') throw new Error();
	return this.tween(e, Hl(t));
}
function Ol() {
	for (
		var t = this._name, e = this._id, n = ho(), r = this._groups, i = r.length, o = 0;
		o < i;
		++o
	)
		for (var a = r[o], s = a.length, l, u = 0; u < s; ++u)
			if ((l = a[u])) {
				var c = Mt(l, e);
				wn(l, t, n, u, a, {
					time: c.time + c.delay + c.duration,
					delay: 0,
					duration: c.duration,
					ease: c.ease
				});
			}
	return new Ft(r, this._parents, t, n);
}
function Vl() {
	var t,
		e,
		n = this,
		r = n._id,
		i = n.size();
	return new Promise(function (o, a) {
		var s = { value: a },
			l = {
				value: function () {
					--i === 0 && o();
				}
			};
		n.each(function () {
			var u = St(this, r),
				c = u.on;
			c !== t && ((e = (t = c).copy()), e._.cancel.push(s), e._.interrupt.push(s), e._.end.push(l)),
				(u.on = e);
		}),
			i === 0 && o();
	});
}
var ql = 0;
function Ft(t, e, n, r) {
	(this._groups = t), (this._parents = e), (this._name = n), (this._id = r);
}
function ho() {
	return ++ql;
}
var Ct = Le.prototype;
Ft.prototype = {
	constructor: Ft,
	select: Tl,
	selectAll: kl,
	selectChild: Ct.selectChild,
	selectChildren: Ct.selectChildren,
	filter: yl,
	merge: _l,
	selection: Sl,
	transition: Ol,
	call: Ct.call,
	nodes: Ct.nodes,
	node: Ct.node,
	size: Ct.size,
	empty: Ct.empty,
	each: Ct.each,
	on: xl,
	attr: el,
	attrTween: al,
	style: El,
	styleTween: Fl,
	text: Ll,
	textTween: Yl,
	remove: Ml,
	tween: Zs,
	delay: ll,
	duration: hl,
	ease: ml,
	easeVarying: pl,
	end: Vl,
	[Symbol.iterator]: Ct[Symbol.iterator]
};
function Bl(t) {
	return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Wl = { time: null, delay: 0, duration: 250, ease: Bl };
function Xl(t, e) {
	for (var n; !(n = t.__transition) || !(n = n[e]); )
		if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`);
	return n;
}
function Zl(t) {
	var e, n;
	t instanceof Ft
		? ((e = t._id), (t = t._name))
		: ((e = ho()), ((n = Wl).time = pr()), (t = t == null ? null : t + ''));
	for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
		for (var a = r[o], s = a.length, l, u = 0; u < s; ++u)
			(l = a[u]) && wn(l, t, e, u, a, n || Xl(l, e));
	return new Ft(r, this._parents, t, e);
}
Le.prototype.interrupt = Bs;
Le.prototype.transition = Zl;
const rr = Math.PI,
	ir = 2 * rr,
	Yt = 1e-6,
	Gl = ir - Yt;
function mo(t) {
	this._ += t[0];
	for (let e = 1, n = t.length; e < n; ++e) this._ += arguments[e] + t[e];
}
function Jl(t) {
	let e = Math.floor(t);
	if (!(e >= 0)) throw new Error(`invalid digits: ${t}`);
	if (e > 15) return mo;
	const n = 10 ** e;
	return function (r) {
		this._ += r[0];
		for (let i = 1, o = r.length; i < o; ++i) this._ += Math.round(arguments[i] * n) / n + r[i];
	};
}
class Ql {
	constructor(e) {
		(this._x0 = this._y0 = this._x1 = this._y1 = null),
			(this._ = ''),
			(this._append = e == null ? mo : Jl(e));
	}
	moveTo(e, n) {
		this._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +n)}`;
	}
	closePath() {
		this._x1 !== null && ((this._x1 = this._x0), (this._y1 = this._y0), this._append`Z`);
	}
	lineTo(e, n) {
		this._append`L${(this._x1 = +e)},${(this._y1 = +n)}`;
	}
	quadraticCurveTo(e, n, r, i) {
		this._append`Q${+e},${+n},${(this._x1 = +r)},${(this._y1 = +i)}`;
	}
	bezierCurveTo(e, n, r, i, o, a) {
		this._append`C${+e},${+n},${+r},${+i},${(this._x1 = +o)},${(this._y1 = +a)}`;
	}
	arcTo(e, n, r, i, o) {
		if (((e = +e), (n = +n), (r = +r), (i = +i), (o = +o), o < 0))
			throw new Error(`negative radius: ${o}`);
		let a = this._x1,
			s = this._y1,
			l = r - e,
			u = i - n,
			c = a - e,
			f = s - n,
			h = c * c + f * f;
		if (this._x1 === null) this._append`M${(this._x1 = e)},${(this._y1 = n)}`;
		else if (h > Yt)
			if (!(Math.abs(f * l - u * c) > Yt) || !o) this._append`L${(this._x1 = e)},${(this._y1 = n)}`;
			else {
				let d = r - a,
					p = i - s,
					x = l * l + u * u,
					_ = d * d + p * p,
					g = Math.sqrt(x),
					w = Math.sqrt(h),
					$ = o * Math.tan((rr - Math.acos((x + h - _) / (2 * g * w))) / 2),
					F = $ / w,
					U = $ / g;
				Math.abs(F - 1) > Yt && this._append`L${e + F * c},${n + F * f}`,
					this
						._append`A${o},${o},0,0,${+(f * d > c * p)},${(this._x1 = e + U * l)},${(this._y1 = n + U * u)}`;
			}
	}
	arc(e, n, r, i, o, a) {
		if (((e = +e), (n = +n), (r = +r), (a = !!a), r < 0)) throw new Error(`negative radius: ${r}`);
		let s = r * Math.cos(i),
			l = r * Math.sin(i),
			u = e + s,
			c = n + l,
			f = 1 ^ a,
			h = a ? i - o : o - i;
		this._x1 === null
			? this._append`M${u},${c}`
			: (Math.abs(this._x1 - u) > Yt || Math.abs(this._y1 - c) > Yt) && this._append`L${u},${c}`,
			r &&
				(h < 0 && (h = (h % ir) + ir),
				h > Gl
					? this
							._append`A${r},${r},0,1,${f},${e - s},${n - l}A${r},${r},0,1,${f},${(this._x1 = u)},${(this._y1 = c)}`
					: h > Yt &&
						this
							._append`A${r},${r},0,${+(h >= rr)},${f},${(this._x1 = e + r * Math.cos(o))},${(this._y1 = n + r * Math.sin(o))}`);
	}
	rect(e, n, r, i) {
		this
			._append`M${(this._x0 = this._x1 = +e)},${(this._y0 = this._y1 = +n)}h${(r = +r)}v${+i}h${-r}Z`;
	}
	toString() {
		return this._;
	}
}
function Kl(t) {
	return Math.abs((t = Math.round(t))) >= 1e21
		? t.toLocaleString('en').replace(/,/g, '')
		: t.toString(10);
}
function dn(t, e) {
	if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf('e')) < 0) return null;
	var n,
		r = t.slice(0, n);
	return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(n + 1)];
}
function ue(t) {
	return (t = dn(Math.abs(t))), t ? t[1] : NaN;
}
function jl(t, e) {
	return function (n, r) {
		for (
			var i = n.length, o = [], a = 0, s = t[0], l = 0;
			i > 0 &&
			s > 0 &&
			(l + s + 1 > r && (s = Math.max(1, r - l)),
			o.push(n.substring((i -= s), i + s)),
			!((l += s + 1) > r));

		)
			s = t[(a = (a + 1) % t.length)];
		return o.reverse().join(e);
	};
}
function tc(t) {
	return function (e) {
		return e.replace(/[0-9]/g, function (n) {
			return t[+n];
		});
	};
}
var ec = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function mn(t) {
	if (!(e = ec.exec(t))) throw new Error('invalid format: ' + t);
	var e;
	return new vr({
		fill: e[1],
		align: e[2],
		sign: e[3],
		symbol: e[4],
		zero: e[5],
		width: e[6],
		comma: e[7],
		precision: e[8] && e[8].slice(1),
		trim: e[9],
		type: e[10]
	});
}
mn.prototype = vr.prototype;
function vr(t) {
	(this.fill = t.fill === void 0 ? ' ' : t.fill + ''),
		(this.align = t.align === void 0 ? '>' : t.align + ''),
		(this.sign = t.sign === void 0 ? '-' : t.sign + ''),
		(this.symbol = t.symbol === void 0 ? '' : t.symbol + ''),
		(this.zero = !!t.zero),
		(this.width = t.width === void 0 ? void 0 : +t.width),
		(this.comma = !!t.comma),
		(this.precision = t.precision === void 0 ? void 0 : +t.precision),
		(this.trim = !!t.trim),
		(this.type = t.type === void 0 ? '' : t.type + '');
}
vr.prototype.toString = function () {
	return (
		this.fill +
		this.align +
		this.sign +
		this.symbol +
		(this.zero ? '0' : '') +
		(this.width === void 0 ? '' : Math.max(1, this.width | 0)) +
		(this.comma ? ',' : '') +
		(this.precision === void 0 ? '' : '.' + Math.max(0, this.precision | 0)) +
		(this.trim ? '~' : '') +
		this.type
	);
};
function nc(t) {
	t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
		switch (t[n]) {
			case '.':
				r = i = n;
				break;
			case '0':
				r === 0 && (r = n), (i = n);
				break;
			default:
				if (!+t[n]) break t;
				r > 0 && (r = 0);
				break;
		}
	return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var go;
function rc(t, e) {
	var n = dn(t, e);
	if (!n) return t + '';
	var r = n[0],
		i = n[1],
		o = i - (go = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1,
		a = r.length;
	return o === a
		? r
		: o > a
			? r + new Array(o - a + 1).join('0')
			: o > 0
				? r.slice(0, o) + '.' + r.slice(o)
				: '0.' + new Array(1 - o).join('0') + dn(t, Math.max(0, e + o - 1))[0];
}
function ii(t, e) {
	var n = dn(t, e);
	if (!n) return t + '';
	var r = n[0],
		i = n[1];
	return i < 0
		? '0.' + new Array(-i).join('0') + r
		: r.length > i + 1
			? r.slice(0, i + 1) + '.' + r.slice(i + 1)
			: r + new Array(i - r.length + 2).join('0');
}
const oi = {
	'%': (t, e) => (t * 100).toFixed(e),
	b: (t) => Math.round(t).toString(2),
	c: (t) => t + '',
	d: Kl,
	e: (t, e) => t.toExponential(e),
	f: (t, e) => t.toFixed(e),
	g: (t, e) => t.toPrecision(e),
	o: (t) => Math.round(t).toString(8),
	p: (t, e) => ii(t * 100, e),
	r: ii,
	s: rc,
	X: (t) => Math.round(t).toString(16).toUpperCase(),
	x: (t) => Math.round(t).toString(16)
};
function ai(t) {
	return t;
}
var ui = Array.prototype.map,
	si = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
function ic(t) {
	var e =
			t.grouping === void 0 || t.thousands === void 0
				? ai
				: jl(ui.call(t.grouping, Number), t.thousands + ''),
		n = t.currency === void 0 ? '' : t.currency[0] + '',
		r = t.currency === void 0 ? '' : t.currency[1] + '',
		i = t.decimal === void 0 ? '.' : t.decimal + '',
		o = t.numerals === void 0 ? ai : tc(ui.call(t.numerals, String)),
		a = t.percent === void 0 ? '%' : t.percent + '',
		s = t.minus === void 0 ? '−' : t.minus + '',
		l = t.nan === void 0 ? 'NaN' : t.nan + '';
	function u(f) {
		f = mn(f);
		var h = f.fill,
			d = f.align,
			p = f.sign,
			x = f.symbol,
			_ = f.zero,
			g = f.width,
			w = f.comma,
			$ = f.precision,
			F = f.trim,
			U = f.type;
		U === 'n' ? ((w = !0), (U = 'g')) : oi[U] || ($ === void 0 && ($ = 12), (F = !0), (U = 'g')),
			(_ || (h === '0' && d === '=')) && ((_ = !0), (h = '0'), (d = '='));
		var M = x === '$' ? n : x === '#' && /[boxX]/.test(U) ? '0' + U.toLowerCase() : '',
			C = x === '$' ? r : /[%p]/.test(U) ? a : '',
			I = oi[U],
			L = /[defgprs%]/.test(U);
		$ =
			$ === void 0
				? 6
				: /[gprs]/.test(U)
					? Math.max(1, Math.min(21, $))
					: Math.max(0, Math.min(20, $));
		function O(A) {
			var Y = M,
				z = C,
				m,
				T,
				y;
			if (U === 'c') (z = I(A) + z), (A = '');
			else {
				A = +A;
				var b = A < 0 || 1 / A < 0;
				if (
					((A = isNaN(A) ? l : I(Math.abs(A), $)),
					F && (A = nc(A)),
					b && +A == 0 && p !== '+' && (b = !1),
					(Y = (b ? (p === '(' ? p : s) : p === '-' || p === '(' ? '' : p) + Y),
					(z = (U === 's' ? si[8 + go / 3] : '') + z + (b && p === '(' ? ')' : '')),
					L)
				) {
					for (m = -1, T = A.length; ++m < T; )
						if (((y = A.charCodeAt(m)), 48 > y || y > 57)) {
							(z = (y === 46 ? i + A.slice(m + 1) : A.slice(m)) + z), (A = A.slice(0, m));
							break;
						}
				}
			}
			w && !_ && (A = e(A, 1 / 0));
			var k = Y.length + A.length + z.length,
				D = k < g ? new Array(g - k + 1).join(h) : '';
			switch ((w && _ && ((A = e(D + A, D.length ? g - z.length : 1 / 0)), (D = '')), d)) {
				case '<':
					A = Y + A + z + D;
					break;
				case '=':
					A = Y + D + A + z;
					break;
				case '^':
					A = D.slice(0, (k = D.length >> 1)) + Y + A + z + D.slice(k);
					break;
				default:
					A = D + Y + A + z;
					break;
			}
			return o(A);
		}
		return (
			(O.toString = function () {
				return f + '';
			}),
			O
		);
	}
	function c(f, h) {
		var d = u(((f = mn(f)), (f.type = 'f'), f)),
			p = Math.max(-8, Math.min(8, Math.floor(ue(h) / 3))) * 3,
			x = Math.pow(10, -p),
			_ = si[8 + p / 3];
		return function (g) {
			return d(x * g) + _;
		};
	}
	return { format: u, formatPrefix: c };
}
var qe, po, yo;
oc({ thousands: ',', grouping: [3], currency: ['$', ''] });
function oc(t) {
	return (qe = ic(t)), (po = qe.format), (yo = qe.formatPrefix), qe;
}
function ac(t) {
	return Math.max(0, -ue(Math.abs(t)));
}
function uc(t, e) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(ue(e) / 3))) * 3 - ue(Math.abs(t)));
}
function sc(t, e) {
	return (t = Math.abs(t)), (e = Math.abs(e) - t), Math.max(0, ue(e) - ue(t)) + 1;
}
function xn(t, e) {
	switch (arguments.length) {
		case 0:
			break;
		case 1:
			this.range(t);
			break;
		default:
			this.range(e).domain(t);
			break;
	}
	return this;
}
const li = Symbol('implicit');
function _o() {
	var t = new Dr(),
		e = [],
		n = [],
		r = li;
	function i(o) {
		let a = t.get(o);
		if (a === void 0) {
			if (r !== li) return r;
			t.set(o, (a = e.push(o) - 1));
		}
		return n[a % n.length];
	}
	return (
		(i.domain = function (o) {
			if (!arguments.length) return e.slice();
			(e = []), (t = new Dr());
			for (const a of o) t.has(a) || t.set(a, e.push(a) - 1);
			return i;
		}),
		(i.range = function (o) {
			return arguments.length ? ((n = Array.from(o)), i) : n.slice();
		}),
		(i.unknown = function (o) {
			return arguments.length ? ((r = o), i) : r;
		}),
		(i.copy = function () {
			return _o(e, n).unknown(r);
		}),
		xn.apply(i, arguments),
		i
	);
}
function vo() {
	var t = _o().unknown(void 0),
		e = t.domain,
		n = t.range,
		r = 0,
		i = 1,
		o,
		a,
		s = !1,
		l = 0,
		u = 0,
		c = 0.5;
	delete t.unknown;
	function f() {
		var h = e().length,
			d = i < r,
			p = d ? i : r,
			x = d ? r : i;
		(o = (x - p) / Math.max(1, h - l + u * 2)),
			s && (o = Math.floor(o)),
			(p += (x - p - o * (h - l)) * c),
			(a = o * (1 - l)),
			s && ((p = Math.round(p)), (a = Math.round(a)));
		var _ = ta(h).map(function (g) {
			return p + o * g;
		});
		return n(d ? _.reverse() : _);
	}
	return (
		(t.domain = function (h) {
			return arguments.length ? (e(h), f()) : e();
		}),
		(t.range = function (h) {
			return arguments.length ? (([r, i] = h), (r = +r), (i = +i), f()) : [r, i];
		}),
		(t.rangeRound = function (h) {
			return ([r, i] = h), (r = +r), (i = +i), (s = !0), f();
		}),
		(t.bandwidth = function () {
			return a;
		}),
		(t.step = function () {
			return o;
		}),
		(t.round = function (h) {
			return arguments.length ? ((s = !!h), f()) : s;
		}),
		(t.padding = function (h) {
			return arguments.length ? ((l = Math.min(1, (u = +h))), f()) : l;
		}),
		(t.paddingInner = function (h) {
			return arguments.length ? ((l = Math.min(1, h)), f()) : l;
		}),
		(t.paddingOuter = function (h) {
			return arguments.length ? ((u = +h), f()) : u;
		}),
		(t.align = function (h) {
			return arguments.length ? ((c = Math.max(0, Math.min(1, h))), f()) : c;
		}),
		(t.copy = function () {
			return vo(e(), [r, i]).round(s).paddingInner(l).paddingOuter(u).align(c);
		}),
		xn.apply(f(), arguments)
	);
}
function lc(t) {
	return function () {
		return t;
	};
}
function cc(t) {
	return +t;
}
var ci = [0, 1];
function te(t) {
	return t;
}
function or(t, e) {
	return (e -= t = +t)
		? function (n) {
				return (n - t) / e;
			}
		: lc(isNaN(e) ? NaN : 0.5);
}
function fc(t, e) {
	var n;
	return (
		t > e && ((n = t), (t = e), (e = n)),
		function (r) {
			return Math.max(t, Math.min(e, r));
		}
	);
}
function hc(t, e, n) {
	var r = t[0],
		i = t[1],
		o = e[0],
		a = e[1];
	return (
		i < r ? ((r = or(i, r)), (o = n(a, o))) : ((r = or(r, i)), (o = n(o, a))),
		function (s) {
			return o(r(s));
		}
	);
}
function dc(t, e, n) {
	var r = Math.min(t.length, e.length) - 1,
		i = new Array(r),
		o = new Array(r),
		a = -1;
	for (t[r] < t[0] && ((t = t.slice().reverse()), (e = e.slice().reverse())); ++a < r; )
		(i[a] = or(t[a], t[a + 1])), (o[a] = n(e[a], e[a + 1]));
	return function (s) {
		var l = qo(t, s, 1, r) - 1;
		return o[l](i[l](s));
	};
}
function wo(t, e) {
	return e
		.domain(t.domain())
		.range(t.range())
		.interpolate(t.interpolate())
		.clamp(t.clamp())
		.unknown(t.unknown());
}
function mc() {
	var t = ci,
		e = ci,
		n = gr,
		r,
		i,
		o,
		a = te,
		s,
		l,
		u;
	function c() {
		var h = Math.min(t.length, e.length);
		return a !== te && (a = fc(t[0], t[h - 1])), (s = h > 2 ? dc : hc), (l = u = null), f;
	}
	function f(h) {
		return h == null || isNaN((h = +h)) ? o : (l || (l = s(t.map(r), e, n)))(r(a(h)));
	}
	return (
		(f.invert = function (h) {
			return a(i((u || (u = s(e, t.map(r), _t)))(h)));
		}),
		(f.domain = function (h) {
			return arguments.length ? ((t = Array.from(h, cc)), c()) : t.slice();
		}),
		(f.range = function (h) {
			return arguments.length ? ((e = Array.from(h)), c()) : e.slice();
		}),
		(f.rangeRound = function (h) {
			return (e = Array.from(h)), (n = Ds), c();
		}),
		(f.clamp = function (h) {
			return arguments.length ? ((a = h ? !0 : te), c()) : a !== te;
		}),
		(f.interpolate = function (h) {
			return arguments.length ? ((n = h), c()) : n;
		}),
		(f.unknown = function (h) {
			return arguments.length ? ((o = h), f) : o;
		}),
		function (h, d) {
			return (r = h), (i = d), c();
		}
	);
}
function xo() {
	return mc()(te, te);
}
function gc(t, e, n, r) {
	var i = zn(t, e, n),
		o;
	switch (((r = mn(r ?? ',f')), r.type)) {
		case 's': {
			var a = Math.max(Math.abs(t), Math.abs(e));
			return r.precision == null && !isNaN((o = uc(i, a))) && (r.precision = o), yo(r, a);
		}
		case '':
		case 'e':
		case 'g':
		case 'p':
		case 'r': {
			r.precision == null &&
				!isNaN((o = sc(i, Math.max(Math.abs(t), Math.abs(e))))) &&
				(r.precision = o - (r.type === 'e'));
			break;
		}
		case 'f':
		case '%': {
			r.precision == null && !isNaN((o = ac(i))) && (r.precision = o - (r.type === '%') * 2);
			break;
		}
	}
	return po(r);
}
function pc(t) {
	var e = t.domain;
	return (
		(t.ticks = function (n) {
			var r = e();
			return Ko(r[0], r[r.length - 1], n ?? 10);
		}),
		(t.tickFormat = function (n, r) {
			var i = e();
			return gc(i[0], i[i.length - 1], n ?? 10, r);
		}),
		(t.nice = function (n) {
			n == null && (n = 10);
			var r = e(),
				i = 0,
				o = r.length - 1,
				a = r[i],
				s = r[o],
				l,
				u,
				c = 10;
			for (s < a && ((u = a), (a = s), (s = u), (u = i), (i = o), (o = u)); c-- > 0; ) {
				if (((u = Rn(a, s, n)), u === l)) return (r[i] = a), (r[o] = s), e(r);
				if (u > 0) (a = Math.floor(a / u) * u), (s = Math.ceil(s / u) * u);
				else if (u < 0) (a = Math.ceil(a * u) / u), (s = Math.floor(s * u) / u);
				else break;
				l = u;
			}
			return t;
		}),
		t
	);
}
function wr() {
	var t = xo();
	return (
		(t.copy = function () {
			return wo(t, wr());
		}),
		xn.apply(t, arguments),
		pc(t)
	);
}
function yc(t, e) {
	t = t.slice();
	var n = 0,
		r = t.length - 1,
		i = t[n],
		o = t[r],
		a;
	return (
		o < i && ((a = n), (n = r), (r = a), (a = i), (i = o), (o = a)),
		(t[n] = e.floor(i)),
		(t[r] = e.ceil(o)),
		t
	);
}
const Nn = new Date(),
	An = new Date();
function j(t, e, n, r) {
	function i(o) {
		return t((o = arguments.length === 0 ? new Date() : new Date(+o))), o;
	}
	return (
		(i.floor = (o) => (t((o = new Date(+o))), o)),
		(i.ceil = (o) => (t((o = new Date(o - 1))), e(o, 1), t(o), o)),
		(i.round = (o) => {
			const a = i(o),
				s = i.ceil(o);
			return o - a < s - o ? a : s;
		}),
		(i.offset = (o, a) => (e((o = new Date(+o)), a == null ? 1 : Math.floor(a)), o)),
		(i.range = (o, a, s) => {
			const l = [];
			if (((o = i.ceil(o)), (s = s == null ? 1 : Math.floor(s)), !(o < a) || !(s > 0))) return l;
			let u;
			do l.push((u = new Date(+o))), e(o, s), t(o);
			while (u < o && o < a);
			return l;
		}),
		(i.filter = (o) =>
			j(
				(a) => {
					if (a >= a) for (; t(a), !o(a); ) a.setTime(a - 1);
				},
				(a, s) => {
					if (a >= a)
						if (s < 0) for (; ++s <= 0; ) for (; e(a, -1), !o(a); );
						else for (; --s >= 0; ) for (; e(a, 1), !o(a); );
				}
			)),
		n &&
			((i.count = (o, a) => (Nn.setTime(+o), An.setTime(+a), t(Nn), t(An), Math.floor(n(Nn, An)))),
			(i.every = (o) => (
				(o = Math.floor(o)),
				!isFinite(o) || !(o > 0)
					? null
					: o > 1
						? i.filter(r ? (a) => r(a) % o === 0 : (a) => i.count(0, a) % o === 0)
						: i
			))),
		i
	);
}
const gn = j(
	() => {},
	(t, e) => {
		t.setTime(+t + e);
	},
	(t, e) => e - t
);
gn.every = (t) => (
	(t = Math.floor(t)),
	!isFinite(t) || !(t > 0)
		? null
		: t > 1
			? j(
					(e) => {
						e.setTime(Math.floor(e / t) * t);
					},
					(e, n) => {
						e.setTime(+e + n * t);
					},
					(e, n) => (n - e) / t
				)
			: gn
);
gn.range;
const Et = 1e3,
	gt = Et * 60,
	Ut = gt * 60,
	Rt = Ut * 24,
	xr = Rt * 7,
	fi = Rt * 30,
	En = Rt * 365,
	ee = j(
		(t) => {
			t.setTime(t - t.getMilliseconds());
		},
		(t, e) => {
			t.setTime(+t + e * Et);
		},
		(t, e) => (e - t) / Et,
		(t) => t.getUTCSeconds()
	);
ee.range;
const br = j(
	(t) => {
		t.setTime(t - t.getMilliseconds() - t.getSeconds() * Et);
	},
	(t, e) => {
		t.setTime(+t + e * gt);
	},
	(t, e) => (e - t) / gt,
	(t) => t.getMinutes()
);
br.range;
const _c = j(
	(t) => {
		t.setUTCSeconds(0, 0);
	},
	(t, e) => {
		t.setTime(+t + e * gt);
	},
	(t, e) => (e - t) / gt,
	(t) => t.getUTCMinutes()
);
_c.range;
const Mr = j(
	(t) => {
		t.setTime(t - t.getMilliseconds() - t.getSeconds() * Et - t.getMinutes() * gt);
	},
	(t, e) => {
		t.setTime(+t + e * Ut);
	},
	(t, e) => (e - t) / Ut,
	(t) => t.getHours()
);
Mr.range;
const vc = j(
	(t) => {
		t.setUTCMinutes(0, 0, 0);
	},
	(t, e) => {
		t.setTime(+t + e * Ut);
	},
	(t, e) => (e - t) / Ut,
	(t) => t.getUTCHours()
);
vc.range;
const He = j(
	(t) => t.setHours(0, 0, 0, 0),
	(t, e) => t.setDate(t.getDate() + e),
	(t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * gt) / Rt,
	(t) => t.getDate() - 1
);
He.range;
const Tr = j(
	(t) => {
		t.setUTCHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setUTCDate(t.getUTCDate() + e);
	},
	(t, e) => (e - t) / Rt,
	(t) => t.getUTCDate() - 1
);
Tr.range;
const wc = j(
	(t) => {
		t.setUTCHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setUTCDate(t.getUTCDate() + e);
	},
	(t, e) => (e - t) / Rt,
	(t) => Math.floor(t / Rt)
);
wc.range;
function Gt(t) {
	return j(
		(e) => {
			e.setDate(e.getDate() - ((e.getDay() + 7 - t) % 7)), e.setHours(0, 0, 0, 0);
		},
		(e, n) => {
			e.setDate(e.getDate() + n * 7);
		},
		(e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * gt) / xr
	);
}
const bn = Gt(0),
	pn = Gt(1),
	xc = Gt(2),
	bc = Gt(3),
	se = Gt(4),
	Mc = Gt(5),
	Tc = Gt(6);
bn.range;
pn.range;
xc.range;
bc.range;
se.range;
Mc.range;
Tc.range;
function Jt(t) {
	return j(
		(e) => {
			e.setUTCDate(e.getUTCDate() - ((e.getUTCDay() + 7 - t) % 7)), e.setUTCHours(0, 0, 0, 0);
		},
		(e, n) => {
			e.setUTCDate(e.getUTCDate() + n * 7);
		},
		(e, n) => (n - e) / xr
	);
}
const bo = Jt(0),
	yn = Jt(1),
	kc = Jt(2),
	$c = Jt(3),
	le = Jt(4),
	Sc = Jt(5),
	Cc = Jt(6);
bo.range;
yn.range;
kc.range;
$c.range;
le.range;
Sc.range;
Cc.range;
const kr = j(
	(t) => {
		t.setDate(1), t.setHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setMonth(t.getMonth() + e);
	},
	(t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12,
	(t) => t.getMonth()
);
kr.range;
const Dc = j(
	(t) => {
		t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setUTCMonth(t.getUTCMonth() + e);
	},
	(t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12,
	(t) => t.getUTCMonth()
);
Dc.range;
const zt = j(
	(t) => {
		t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setFullYear(t.getFullYear() + e);
	},
	(t, e) => e.getFullYear() - t.getFullYear(),
	(t) => t.getFullYear()
);
zt.every = (t) =>
	!isFinite((t = Math.floor(t))) || !(t > 0)
		? null
		: j(
				(e) => {
					e.setFullYear(Math.floor(e.getFullYear() / t) * t),
						e.setMonth(0, 1),
						e.setHours(0, 0, 0, 0);
				},
				(e, n) => {
					e.setFullYear(e.getFullYear() + n * t);
				}
			);
zt.range;
const Zt = j(
	(t) => {
		t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
	},
	(t, e) => {
		t.setUTCFullYear(t.getUTCFullYear() + e);
	},
	(t, e) => e.getUTCFullYear() - t.getUTCFullYear(),
	(t) => t.getUTCFullYear()
);
Zt.every = (t) =>
	!isFinite((t = Math.floor(t))) || !(t > 0)
		? null
		: j(
				(e) => {
					e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t),
						e.setUTCMonth(0, 1),
						e.setUTCHours(0, 0, 0, 0);
				},
				(e, n) => {
					e.setUTCFullYear(e.getUTCFullYear() + n * t);
				}
			);
Zt.range;
function Nc(t, e, n, r, i, o) {
	const a = [
		[ee, 1, Et],
		[ee, 5, 5 * Et],
		[ee, 15, 15 * Et],
		[ee, 30, 30 * Et],
		[o, 1, gt],
		[o, 5, 5 * gt],
		[o, 15, 15 * gt],
		[o, 30, 30 * gt],
		[i, 1, Ut],
		[i, 3, 3 * Ut],
		[i, 6, 6 * Ut],
		[i, 12, 12 * Ut],
		[r, 1, Rt],
		[r, 2, 2 * Rt],
		[n, 1, xr],
		[e, 1, fi],
		[e, 3, 3 * fi],
		[t, 1, En]
	];
	function s(u, c, f) {
		const h = c < u;
		h && ([u, c] = [c, u]);
		const d = f && typeof f.range == 'function' ? f : l(u, c, f),
			p = d ? d.range(u, +c + 1) : [];
		return h ? p.reverse() : p;
	}
	function l(u, c, f) {
		const h = Math.abs(c - u) / f,
			d = sr(([, , _]) => _).right(a, h);
		if (d === a.length) return t.every(zn(u / En, c / En, f));
		if (d === 0) return gn.every(Math.max(zn(u, c, f), 1));
		const [p, x] = a[h / a[d - 1][2] < a[d][2] / h ? d - 1 : d];
		return p.every(x);
	}
	return [s, l];
}
const [Ac, Ec] = Nc(zt, kr, bn, He, Mr, br);
function Un(t) {
	if (0 <= t.y && t.y < 100) {
		var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
		return e.setFullYear(t.y), e;
	}
	return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function In(t) {
	if (0 <= t.y && t.y < 100) {
		var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
		return e.setUTCFullYear(t.y), e;
	}
	return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function he(t, e, n) {
	return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function Uc(t) {
	var e = t.dateTime,
		n = t.date,
		r = t.time,
		i = t.periods,
		o = t.days,
		a = t.shortDays,
		s = t.months,
		l = t.shortMonths,
		u = de(i),
		c = me(i),
		f = de(o),
		h = me(o),
		d = de(a),
		p = me(a),
		x = de(s),
		_ = me(s),
		g = de(l),
		w = me(l),
		$ = {
			a: b,
			A: k,
			b: D,
			B: R,
			c: null,
			d: yi,
			e: yi,
			f: nf,
			g: df,
			G: gf,
			H: jc,
			I: tf,
			j: ef,
			L: Mo,
			m: rf,
			M: of,
			p: B,
			q: G,
			Q: wi,
			s: xi,
			S: af,
			u: uf,
			U: sf,
			V: lf,
			w: cf,
			W: ff,
			x: null,
			X: null,
			y: hf,
			Y: mf,
			Z: pf,
			'%': vi
		},
		F = {
			a: rt,
			A: K,
			b: st,
			B: pt,
			c: null,
			d: _i,
			e: _i,
			f: wf,
			g: Nf,
			G: Ef,
			H: yf,
			I: _f,
			j: vf,
			L: ko,
			m: xf,
			M: bf,
			p: lt,
			q: yt,
			Q: wi,
			s: xi,
			S: Mf,
			u: Tf,
			U: kf,
			V: $f,
			w: Sf,
			W: Cf,
			x: null,
			X: null,
			y: Df,
			Y: Af,
			Z: Uf,
			'%': vi
		},
		U = {
			a: O,
			A,
			b: Y,
			B: z,
			c: m,
			d: gi,
			e: gi,
			f: Gc,
			g: mi,
			G: di,
			H: pi,
			I: pi,
			j: Bc,
			L: Zc,
			m: qc,
			M: Wc,
			p: L,
			q: Vc,
			Q: Qc,
			s: Kc,
			S: Xc,
			u: Lc,
			U: Pc,
			V: Hc,
			w: zc,
			W: Yc,
			x: T,
			X: y,
			y: mi,
			Y: di,
			Z: Oc,
			'%': Jc
		};
	($.x = M(n, $)),
		($.X = M(r, $)),
		($.c = M(e, $)),
		(F.x = M(n, F)),
		(F.X = M(r, F)),
		(F.c = M(e, F));
	function M(S, P) {
		return function (V) {
			var v = [],
				at = -1,
				J = 0,
				ct = S.length,
				ft,
				Pt,
				$r;
			for (V instanceof Date || (V = new Date(+V)); ++at < ct; )
				S.charCodeAt(at) === 37 &&
					(v.push(S.slice(J, at)),
					(Pt = hi[(ft = S.charAt(++at))]) != null
						? (ft = S.charAt(++at))
						: (Pt = ft === 'e' ? ' ' : '0'),
					($r = P[ft]) && (ft = $r(V, Pt)),
					v.push(ft),
					(J = at + 1));
			return v.push(S.slice(J, at)), v.join('');
		};
	}
	function C(S, P) {
		return function (V) {
			var v = he(1900, void 0, 1),
				at = I(v, S, (V += ''), 0),
				J,
				ct;
			if (at != V.length) return null;
			if ('Q' in v) return new Date(v.Q);
			if ('s' in v) return new Date(v.s * 1e3 + ('L' in v ? v.L : 0));
			if (
				(P && !('Z' in v) && (v.Z = 0),
				'p' in v && (v.H = (v.H % 12) + v.p * 12),
				v.m === void 0 && (v.m = 'q' in v ? v.q : 0),
				'V' in v)
			) {
				if (v.V < 1 || v.V > 53) return null;
				'w' in v || (v.w = 1),
					'Z' in v
						? ((J = In(he(v.y, 0, 1))),
							(ct = J.getUTCDay()),
							(J = ct > 4 || ct === 0 ? yn.ceil(J) : yn(J)),
							(J = Tr.offset(J, (v.V - 1) * 7)),
							(v.y = J.getUTCFullYear()),
							(v.m = J.getUTCMonth()),
							(v.d = J.getUTCDate() + ((v.w + 6) % 7)))
						: ((J = Un(he(v.y, 0, 1))),
							(ct = J.getDay()),
							(J = ct > 4 || ct === 0 ? pn.ceil(J) : pn(J)),
							(J = He.offset(J, (v.V - 1) * 7)),
							(v.y = J.getFullYear()),
							(v.m = J.getMonth()),
							(v.d = J.getDate() + ((v.w + 6) % 7)));
			} else
				('W' in v || 'U' in v) &&
					('w' in v || (v.w = 'u' in v ? v.u % 7 : 'W' in v ? 1 : 0),
					(ct = 'Z' in v ? In(he(v.y, 0, 1)).getUTCDay() : Un(he(v.y, 0, 1)).getDay()),
					(v.m = 0),
					(v.d =
						'W' in v
							? ((v.w + 6) % 7) + v.W * 7 - ((ct + 5) % 7)
							: v.w + v.U * 7 - ((ct + 6) % 7)));
			return 'Z' in v ? ((v.H += (v.Z / 100) | 0), (v.M += v.Z % 100), In(v)) : Un(v);
		};
	}
	function I(S, P, V, v) {
		for (var at = 0, J = P.length, ct = V.length, ft, Pt; at < J; ) {
			if (v >= ct) return -1;
			if (((ft = P.charCodeAt(at++)), ft === 37)) {
				if (
					((ft = P.charAt(at++)),
					(Pt = U[ft in hi ? P.charAt(at++) : ft]),
					!Pt || (v = Pt(S, V, v)) < 0)
				)
					return -1;
			} else if (ft != V.charCodeAt(v++)) return -1;
		}
		return v;
	}
	function L(S, P, V) {
		var v = u.exec(P.slice(V));
		return v ? ((S.p = c.get(v[0].toLowerCase())), V + v[0].length) : -1;
	}
	function O(S, P, V) {
		var v = d.exec(P.slice(V));
		return v ? ((S.w = p.get(v[0].toLowerCase())), V + v[0].length) : -1;
	}
	function A(S, P, V) {
		var v = f.exec(P.slice(V));
		return v ? ((S.w = h.get(v[0].toLowerCase())), V + v[0].length) : -1;
	}
	function Y(S, P, V) {
		var v = g.exec(P.slice(V));
		return v ? ((S.m = w.get(v[0].toLowerCase())), V + v[0].length) : -1;
	}
	function z(S, P, V) {
		var v = x.exec(P.slice(V));
		return v ? ((S.m = _.get(v[0].toLowerCase())), V + v[0].length) : -1;
	}
	function m(S, P, V) {
		return I(S, e, P, V);
	}
	function T(S, P, V) {
		return I(S, n, P, V);
	}
	function y(S, P, V) {
		return I(S, r, P, V);
	}
	function b(S) {
		return a[S.getDay()];
	}
	function k(S) {
		return o[S.getDay()];
	}
	function D(S) {
		return l[S.getMonth()];
	}
	function R(S) {
		return s[S.getMonth()];
	}
	function B(S) {
		return i[+(S.getHours() >= 12)];
	}
	function G(S) {
		return 1 + ~~(S.getMonth() / 3);
	}
	function rt(S) {
		return a[S.getUTCDay()];
	}
	function K(S) {
		return o[S.getUTCDay()];
	}
	function st(S) {
		return l[S.getUTCMonth()];
	}
	function pt(S) {
		return s[S.getUTCMonth()];
	}
	function lt(S) {
		return i[+(S.getUTCHours() >= 12)];
	}
	function yt(S) {
		return 1 + ~~(S.getUTCMonth() / 3);
	}
	return {
		format: function (S) {
			var P = M((S += ''), $);
			return (
				(P.toString = function () {
					return S;
				}),
				P
			);
		},
		parse: function (S) {
			var P = C((S += ''), !1);
			return (
				(P.toString = function () {
					return S;
				}),
				P
			);
		},
		utcFormat: function (S) {
			var P = M((S += ''), F);
			return (
				(P.toString = function () {
					return S;
				}),
				P
			);
		},
		utcParse: function (S) {
			var P = C((S += ''), !0);
			return (
				(P.toString = function () {
					return S;
				}),
				P
			);
		}
	};
}
var hi = { '-': '', _: ' ', 0: '0' },
	nt = /^\s*\d+/,
	Ic = /^%/,
	Fc = /[\\^$*+?|[\]().{}]/g;
function q(t, e, n) {
	var r = t < 0 ? '-' : '',
		i = (r ? -t : t) + '',
		o = i.length;
	return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Rc(t) {
	return t.replace(Fc, '\\$&');
}
function de(t) {
	return new RegExp('^(?:' + t.map(Rc).join('|') + ')', 'i');
}
function me(t) {
	return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function zc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 1));
	return r ? ((t.w = +r[0]), n + r[0].length) : -1;
}
function Lc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 1));
	return r ? ((t.u = +r[0]), n + r[0].length) : -1;
}
function Pc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.U = +r[0]), n + r[0].length) : -1;
}
function Hc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.V = +r[0]), n + r[0].length) : -1;
}
function Yc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.W = +r[0]), n + r[0].length) : -1;
}
function di(t, e, n) {
	var r = nt.exec(e.slice(n, n + 4));
	return r ? ((t.y = +r[0]), n + r[0].length) : -1;
}
function mi(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3)), n + r[0].length) : -1;
}
function Oc(t, e, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
	return r ? ((t.Z = r[1] ? 0 : -(r[2] + (r[3] || '00'))), n + r[0].length) : -1;
}
function Vc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 1));
	return r ? ((t.q = r[0] * 3 - 3), n + r[0].length) : -1;
}
function qc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.m = r[0] - 1), n + r[0].length) : -1;
}
function gi(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.d = +r[0]), n + r[0].length) : -1;
}
function Bc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 3));
	return r ? ((t.m = 0), (t.d = +r[0]), n + r[0].length) : -1;
}
function pi(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.H = +r[0]), n + r[0].length) : -1;
}
function Wc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.M = +r[0]), n + r[0].length) : -1;
}
function Xc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 2));
	return r ? ((t.S = +r[0]), n + r[0].length) : -1;
}
function Zc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 3));
	return r ? ((t.L = +r[0]), n + r[0].length) : -1;
}
function Gc(t, e, n) {
	var r = nt.exec(e.slice(n, n + 6));
	return r ? ((t.L = Math.floor(r[0] / 1e3)), n + r[0].length) : -1;
}
function Jc(t, e, n) {
	var r = Ic.exec(e.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function Qc(t, e, n) {
	var r = nt.exec(e.slice(n));
	return r ? ((t.Q = +r[0]), n + r[0].length) : -1;
}
function Kc(t, e, n) {
	var r = nt.exec(e.slice(n));
	return r ? ((t.s = +r[0]), n + r[0].length) : -1;
}
function yi(t, e) {
	return q(t.getDate(), e, 2);
}
function jc(t, e) {
	return q(t.getHours(), e, 2);
}
function tf(t, e) {
	return q(t.getHours() % 12 || 12, e, 2);
}
function ef(t, e) {
	return q(1 + He.count(zt(t), t), e, 3);
}
function Mo(t, e) {
	return q(t.getMilliseconds(), e, 3);
}
function nf(t, e) {
	return Mo(t, e) + '000';
}
function rf(t, e) {
	return q(t.getMonth() + 1, e, 2);
}
function of(t, e) {
	return q(t.getMinutes(), e, 2);
}
function af(t, e) {
	return q(t.getSeconds(), e, 2);
}
function uf(t) {
	var e = t.getDay();
	return e === 0 ? 7 : e;
}
function sf(t, e) {
	return q(bn.count(zt(t) - 1, t), e, 2);
}
function To(t) {
	var e = t.getDay();
	return e >= 4 || e === 0 ? se(t) : se.ceil(t);
}
function lf(t, e) {
	return (t = To(t)), q(se.count(zt(t), t) + (zt(t).getDay() === 4), e, 2);
}
function cf(t) {
	return t.getDay();
}
function ff(t, e) {
	return q(pn.count(zt(t) - 1, t), e, 2);
}
function hf(t, e) {
	return q(t.getFullYear() % 100, e, 2);
}
function df(t, e) {
	return (t = To(t)), q(t.getFullYear() % 100, e, 2);
}
function mf(t, e) {
	return q(t.getFullYear() % 1e4, e, 4);
}
function gf(t, e) {
	var n = t.getDay();
	return (t = n >= 4 || n === 0 ? se(t) : se.ceil(t)), q(t.getFullYear() % 1e4, e, 4);
}
function pf(t) {
	var e = t.getTimezoneOffset();
	return (e > 0 ? '-' : ((e *= -1), '+')) + q((e / 60) | 0, '0', 2) + q(e % 60, '0', 2);
}
function _i(t, e) {
	return q(t.getUTCDate(), e, 2);
}
function yf(t, e) {
	return q(t.getUTCHours(), e, 2);
}
function _f(t, e) {
	return q(t.getUTCHours() % 12 || 12, e, 2);
}
function vf(t, e) {
	return q(1 + Tr.count(Zt(t), t), e, 3);
}
function ko(t, e) {
	return q(t.getUTCMilliseconds(), e, 3);
}
function wf(t, e) {
	return ko(t, e) + '000';
}
function xf(t, e) {
	return q(t.getUTCMonth() + 1, e, 2);
}
function bf(t, e) {
	return q(t.getUTCMinutes(), e, 2);
}
function Mf(t, e) {
	return q(t.getUTCSeconds(), e, 2);
}
function Tf(t) {
	var e = t.getUTCDay();
	return e === 0 ? 7 : e;
}
function kf(t, e) {
	return q(bo.count(Zt(t) - 1, t), e, 2);
}
function $o(t) {
	var e = t.getUTCDay();
	return e >= 4 || e === 0 ? le(t) : le.ceil(t);
}
function $f(t, e) {
	return (t = $o(t)), q(le.count(Zt(t), t) + (Zt(t).getUTCDay() === 4), e, 2);
}
function Sf(t) {
	return t.getUTCDay();
}
function Cf(t, e) {
	return q(yn.count(Zt(t) - 1, t), e, 2);
}
function Df(t, e) {
	return q(t.getUTCFullYear() % 100, e, 2);
}
function Nf(t, e) {
	return (t = $o(t)), q(t.getUTCFullYear() % 100, e, 2);
}
function Af(t, e) {
	return q(t.getUTCFullYear() % 1e4, e, 4);
}
function Ef(t, e) {
	var n = t.getUTCDay();
	return (t = n >= 4 || n === 0 ? le(t) : le.ceil(t)), q(t.getUTCFullYear() % 1e4, e, 4);
}
function Uf() {
	return '+0000';
}
function vi() {
	return '%';
}
function wi(t) {
	return +t;
}
function xi(t) {
	return Math.floor(+t / 1e3);
}
var Qt, So;
If({
	dateTime: '%x, %X',
	date: '%-m/%-d/%Y',
	time: '%-I:%M:%S %p',
	periods: ['AM', 'PM'],
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	months: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
});
function If(t) {
	return (Qt = Uc(t)), (So = Qt.format), Qt.parse, Qt.utcFormat, Qt.utcParse, Qt;
}
function Ff(t) {
	return new Date(t);
}
function Rf(t) {
	return t instanceof Date ? +t : +new Date(+t);
}
function Co(t, e, n, r, i, o, a, s, l, u) {
	var c = xo(),
		f = c.invert,
		h = c.domain,
		d = u('.%L'),
		p = u(':%S'),
		x = u('%I:%M'),
		_ = u('%I %p'),
		g = u('%a %d'),
		w = u('%b %d'),
		$ = u('%B'),
		F = u('%Y');
	function U(M) {
		return (
			l(M) < M
				? d
				: s(M) < M
					? p
					: a(M) < M
						? x
						: o(M) < M
							? _
							: r(M) < M
								? i(M) < M
									? g
									: w
								: n(M) < M
									? $
									: F
		)(M);
	}
	return (
		(c.invert = function (M) {
			return new Date(f(M));
		}),
		(c.domain = function (M) {
			return arguments.length ? h(Array.from(M, Rf)) : h().map(Ff);
		}),
		(c.ticks = function (M) {
			var C = h();
			return t(C[0], C[C.length - 1], M ?? 10);
		}),
		(c.tickFormat = function (M, C) {
			return C == null ? U : u(C);
		}),
		(c.nice = function (M) {
			var C = h();
			return (
				(!M || typeof M.range != 'function') && (M = e(C[0], C[C.length - 1], M ?? 10)),
				M ? h(yc(C, M)) : c
			);
		}),
		(c.copy = function () {
			return wo(c, Co(t, e, n, r, i, o, a, s, l, u));
		}),
		c
	);
}
function zf() {
	return xn.apply(
		Co(Ac, Ec, zt, kr, bn, He, Mr, br, ee, So).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]),
		arguments
	);
}
function Kt(t) {
	return function () {
		return t;
	};
}
function Lf(t) {
	let e = 3;
	return (
		(t.digits = function (n) {
			if (!arguments.length) return e;
			if (n == null) e = null;
			else {
				const r = Math.floor(n);
				if (!(r >= 0)) throw new RangeError(`invalid digits: ${n}`);
				e = r;
			}
			return t;
		}),
		() => new Ql(e)
	);
}
function Pf(t) {
	return typeof t == 'object' && 'length' in t ? t : Array.from(t);
}
function Do(t) {
	this._context = t;
}
Do.prototype = {
	areaStart: function () {
		this._line = 0;
	},
	areaEnd: function () {
		this._line = NaN;
	},
	lineStart: function () {
		this._point = 0;
	},
	lineEnd: function () {
		(this._line || (this._line !== 0 && this._point === 1)) && this._context.closePath(),
			(this._line = 1 - this._line);
	},
	point: function (t, e) {
		switch (((t = +t), (e = +e), this._point)) {
			case 0:
				(this._point = 1), this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
				break;
			case 1:
				this._point = 2;
			default:
				this._context.lineTo(t, e);
				break;
		}
	}
};
function Hf(t) {
	return new Do(t);
}
function Yf(t) {
	return t[0];
}
function Of(t) {
	return t[1];
}
function Vf(t, e) {
	var n = Kt(!0),
		r = null,
		i = Hf,
		o = null,
		a = Lf(s);
	(t = typeof t == 'function' ? t : t === void 0 ? Yf : Kt(t)),
		(e = typeof e == 'function' ? e : e === void 0 ? Of : Kt(e));
	function s(l) {
		var u,
			c = (l = Pf(l)).length,
			f,
			h = !1,
			d;
		for (r == null && (o = i((d = a()))), u = 0; u <= c; ++u)
			!(u < c && n((f = l[u]), u, l)) === h && ((h = !h) ? o.lineStart() : o.lineEnd()),
				h && o.point(+t(f, u, l), +e(f, u, l));
		if (d) return (o = null), d + '' || null;
	}
	return (
		(s.x = function (l) {
			return arguments.length ? ((t = typeof l == 'function' ? l : Kt(+l)), s) : t;
		}),
		(s.y = function (l) {
			return arguments.length ? ((e = typeof l == 'function' ? l : Kt(+l)), s) : e;
		}),
		(s.defined = function (l) {
			return arguments.length ? ((n = typeof l == 'function' ? l : Kt(!!l)), s) : n;
		}),
		(s.curve = function (l) {
			return arguments.length ? ((i = l), r != null && (o = i(r)), s) : i;
		}),
		(s.context = function (l) {
			return arguments.length ? (l == null ? (r = o = null) : (o = i((r = l))), s) : r;
		}),
		s
	);
}
const Be = (t) => () => t;
function qf(t, { sourceEvent: e, target: n, transform: r, dispatch: i }) {
	Object.defineProperties(this, {
		type: { value: t, enumerable: !0, configurable: !0 },
		sourceEvent: { value: e, enumerable: !0, configurable: !0 },
		target: { value: n, enumerable: !0, configurable: !0 },
		transform: { value: r, enumerable: !0, configurable: !0 },
		_: { value: i }
	});
}
function It(t, e, n) {
	(this.k = t), (this.x = e), (this.y = n);
}
It.prototype = {
	constructor: It,
	scale: function (t) {
		return t === 1 ? this : new It(this.k * t, this.x, this.y);
	},
	translate: function (t, e) {
		return (t === 0) & (e === 0) ? this : new It(this.k, this.x + this.k * t, this.y + this.k * e);
	},
	apply: function (t) {
		return [t[0] * this.k + this.x, t[1] * this.k + this.y];
	},
	applyX: function (t) {
		return t * this.k + this.x;
	},
	applyY: function (t) {
		return t * this.k + this.y;
	},
	invert: function (t) {
		return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
	},
	invertX: function (t) {
		return (t - this.x) / this.k;
	},
	invertY: function (t) {
		return (t - this.y) / this.k;
	},
	rescaleX: function (t) {
		return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
	},
	rescaleY: function (t) {
		return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
	},
	toString: function () {
		return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
	}
};
var No = new It(1, 0, 0);
It.prototype;
function Fn(t) {
	t.stopImmediatePropagation();
}
function ge(t) {
	t.preventDefault(), t.stopImmediatePropagation();
}
function Bf(t) {
	return (!t.ctrlKey || t.type === 'wheel') && !t.button;
}
function Wf() {
	var t = this;
	return t instanceof SVGElement
		? ((t = t.ownerSVGElement || t),
			t.hasAttribute('viewBox')
				? ((t = t.viewBox.baseVal),
					[
						[t.x, t.y],
						[t.x + t.width, t.y + t.height]
					])
				: [
						[0, 0],
						[t.width.baseVal.value, t.height.baseVal.value]
					])
		: [
				[0, 0],
				[t.clientWidth, t.clientHeight]
			];
}
function bi() {
	return this.__zoom || No;
}
function Xf(t) {
	return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 0.002) * (t.ctrlKey ? 10 : 1);
}
function Zf() {
	return navigator.maxTouchPoints || 'ontouchstart' in this;
}
function Gf(t, e, n) {
	var r = t.invertX(e[0][0]) - n[0][0],
		i = t.invertX(e[1][0]) - n[1][0],
		o = t.invertY(e[0][1]) - n[0][1],
		a = t.invertY(e[1][1]) - n[1][1];
	return t.translate(
		i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
		a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
	);
}
function Jf() {
	var t = Bf,
		e = Wf,
		n = Gf,
		r = Xf,
		i = Zf,
		o = [0, 1 / 0],
		a = [
			[-1 / 0, -1 / 0],
			[1 / 0, 1 / 0]
		],
		s = 250,
		l = zs,
		u = cr('start', 'zoom', 'end'),
		c,
		f,
		h,
		d = 500,
		p = 150,
		x = 0,
		_ = 10;
	function g(m) {
		m.property('__zoom', bi)
			.on('wheel.zoom', I, { passive: !1 })
			.on('mousedown.zoom', L)
			.on('dblclick.zoom', O)
			.filter(i)
			.on('touchstart.zoom', A)
			.on('touchmove.zoom', Y)
			.on('touchend.zoom touchcancel.zoom', z)
			.style('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
	}
	(g.transform = function (m, T, y, b) {
		var k = m.selection ? m.selection() : m;
		k.property('__zoom', bi),
			m !== k
				? U(m, T, y, b)
				: k.interrupt().each(function () {
						M(this, arguments)
							.event(b)
							.start()
							.zoom(null, typeof T == 'function' ? T.apply(this, arguments) : T)
							.end();
					});
	}),
		(g.scaleBy = function (m, T, y, b) {
			g.scaleTo(
				m,
				function () {
					var k = this.__zoom.k,
						D = typeof T == 'function' ? T.apply(this, arguments) : T;
					return k * D;
				},
				y,
				b
			);
		}),
		(g.scaleTo = function (m, T, y, b) {
			g.transform(
				m,
				function () {
					var k = e.apply(this, arguments),
						D = this.__zoom,
						R = y == null ? F(k) : typeof y == 'function' ? y.apply(this, arguments) : y,
						B = D.invert(R),
						G = typeof T == 'function' ? T.apply(this, arguments) : T;
					return n($(w(D, G), R, B), k, a);
				},
				y,
				b
			);
		}),
		(g.translateBy = function (m, T, y, b) {
			g.transform(
				m,
				function () {
					return n(
						this.__zoom.translate(
							typeof T == 'function' ? T.apply(this, arguments) : T,
							typeof y == 'function' ? y.apply(this, arguments) : y
						),
						e.apply(this, arguments),
						a
					);
				},
				null,
				b
			);
		}),
		(g.translateTo = function (m, T, y, b, k) {
			g.transform(
				m,
				function () {
					var D = e.apply(this, arguments),
						R = this.__zoom,
						B = b == null ? F(D) : typeof b == 'function' ? b.apply(this, arguments) : b;
					return n(
						No.translate(B[0], B[1])
							.scale(R.k)
							.translate(
								typeof T == 'function' ? -T.apply(this, arguments) : -T,
								typeof y == 'function' ? -y.apply(this, arguments) : -y
							),
						D,
						a
					);
				},
				b,
				k
			);
		});
	function w(m, T) {
		return (T = Math.max(o[0], Math.min(o[1], T))), T === m.k ? m : new It(T, m.x, m.y);
	}
	function $(m, T, y) {
		var b = T[0] - y[0] * m.k,
			k = T[1] - y[1] * m.k;
		return b === m.x && k === m.y ? m : new It(m.k, b, k);
	}
	function F(m) {
		return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
	}
	function U(m, T, y, b) {
		m.on('start.zoom', function () {
			M(this, arguments).event(b).start();
		})
			.on('interrupt.zoom end.zoom', function () {
				M(this, arguments).event(b).end();
			})
			.tween('zoom', function () {
				var k = this,
					D = arguments,
					R = M(k, D).event(b),
					B = e.apply(k, D),
					G = y == null ? F(B) : typeof y == 'function' ? y.apply(k, D) : y,
					rt = Math.max(B[1][0] - B[0][0], B[1][1] - B[0][1]),
					K = k.__zoom,
					st = typeof T == 'function' ? T.apply(k, D) : T,
					pt = l(K.invert(G).concat(rt / K.k), st.invert(G).concat(rt / st.k));
				return function (lt) {
					if (lt === 1) lt = st;
					else {
						var yt = pt(lt),
							S = rt / yt[2];
						lt = new It(S, G[0] - yt[0] * S, G[1] - yt[1] * S);
					}
					R.zoom(null, lt);
				};
			});
	}
	function M(m, T, y) {
		return (!y && m.__zooming) || new C(m, T);
	}
	function C(m, T) {
		(this.that = m),
			(this.args = T),
			(this.active = 0),
			(this.sourceEvent = null),
			(this.extent = e.apply(m, T)),
			(this.taps = 0);
	}
	C.prototype = {
		event: function (m) {
			return m && (this.sourceEvent = m), this;
		},
		start: function () {
			return ++this.active === 1 && ((this.that.__zooming = this), this.emit('start')), this;
		},
		zoom: function (m, T) {
			return (
				this.mouse && m !== 'mouse' && (this.mouse[1] = T.invert(this.mouse[0])),
				this.touch0 && m !== 'touch' && (this.touch0[1] = T.invert(this.touch0[0])),
				this.touch1 && m !== 'touch' && (this.touch1[1] = T.invert(this.touch1[0])),
				(this.that.__zoom = T),
				this.emit('zoom'),
				this
			);
		},
		end: function () {
			return --this.active === 0 && (delete this.that.__zooming, this.emit('end')), this;
		},
		emit: function (m) {
			var T = ht(this.that).datum();
			u.call(
				m,
				this.that,
				new qf(m, {
					sourceEvent: this.sourceEvent,
					target: g,
					type: m,
					transform: this.that.__zoom,
					dispatch: u
				}),
				T
			);
		}
	};
	function I(m, ...T) {
		if (!t.apply(this, arguments)) return;
		var y = M(this, T).event(m),
			b = this.__zoom,
			k = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, r.apply(this, arguments)))),
			D = Ht(m);
		if (y.wheel)
			(y.mouse[0][0] !== D[0] || y.mouse[0][1] !== D[1]) &&
				(y.mouse[1] = b.invert((y.mouse[0] = D))),
				clearTimeout(y.wheel);
		else {
			if (b.k === k) return;
			(y.mouse = [D, b.invert(D)]), Je(this), y.start();
		}
		ge(m),
			(y.wheel = setTimeout(R, p)),
			y.zoom('mouse', n($(w(b, k), y.mouse[0], y.mouse[1]), y.extent, a));
		function R() {
			(y.wheel = null), y.end();
		}
	}
	function L(m, ...T) {
		if (h || !t.apply(this, arguments)) return;
		var y = m.currentTarget,
			b = M(this, T, !0).event(m),
			k = ht(m.view).on('mousemove.zoom', G, !0).on('mouseup.zoom', rt, !0),
			D = Ht(m, y),
			R = m.clientX,
			B = m.clientY;
		os(m.view), Fn(m), (b.mouse = [D, this.__zoom.invert(D)]), Je(this), b.start();
		function G(K) {
			if ((ge(K), !b.moved)) {
				var st = K.clientX - R,
					pt = K.clientY - B;
				b.moved = st * st + pt * pt > x;
			}
			b.event(K).zoom(
				'mouse',
				n($(b.that.__zoom, (b.mouse[0] = Ht(K, y)), b.mouse[1]), b.extent, a)
			);
		}
		function rt(K) {
			k.on('mousemove.zoom mouseup.zoom', null), as(K.view, b.moved), ge(K), b.event(K).end();
		}
	}
	function O(m, ...T) {
		if (t.apply(this, arguments)) {
			var y = this.__zoom,
				b = Ht(m.changedTouches ? m.changedTouches[0] : m, this),
				k = y.invert(b),
				D = y.k * (m.shiftKey ? 0.5 : 2),
				R = n($(w(y, D), b, k), e.apply(this, T), a);
			ge(m),
				s > 0
					? ht(this).transition().duration(s).call(U, R, b, m)
					: ht(this).call(g.transform, R, b, m);
		}
	}
	function A(m, ...T) {
		if (t.apply(this, arguments)) {
			var y = m.touches,
				b = y.length,
				k = M(this, T, m.changedTouches.length === b).event(m),
				D,
				R,
				B,
				G;
			for (Fn(m), R = 0; R < b; ++R)
				(B = y[R]),
					(G = Ht(B, this)),
					(G = [G, this.__zoom.invert(G), B.identifier]),
					k.touch0
						? !k.touch1 && k.touch0[2] !== G[2] && ((k.touch1 = G), (k.taps = 0))
						: ((k.touch0 = G), (D = !0), (k.taps = 1 + !!c));
			c && (c = clearTimeout(c)),
				D &&
					(k.taps < 2 &&
						((f = G[0]),
						(c = setTimeout(function () {
							c = null;
						}, d))),
					Je(this),
					k.start());
		}
	}
	function Y(m, ...T) {
		if (this.__zooming) {
			var y = M(this, T).event(m),
				b = m.changedTouches,
				k = b.length,
				D,
				R,
				B,
				G;
			for (ge(m), D = 0; D < k; ++D)
				(R = b[D]),
					(B = Ht(R, this)),
					y.touch0 && y.touch0[2] === R.identifier
						? (y.touch0[0] = B)
						: y.touch1 && y.touch1[2] === R.identifier && (y.touch1[0] = B);
			if (((R = y.that.__zoom), y.touch1)) {
				var rt = y.touch0[0],
					K = y.touch0[1],
					st = y.touch1[0],
					pt = y.touch1[1],
					lt = (lt = st[0] - rt[0]) * lt + (lt = st[1] - rt[1]) * lt,
					yt = (yt = pt[0] - K[0]) * yt + (yt = pt[1] - K[1]) * yt;
				(R = w(R, Math.sqrt(lt / yt))),
					(B = [(rt[0] + st[0]) / 2, (rt[1] + st[1]) / 2]),
					(G = [(K[0] + pt[0]) / 2, (K[1] + pt[1]) / 2]);
			} else if (y.touch0) (B = y.touch0[0]), (G = y.touch0[1]);
			else return;
			y.zoom('touch', n($(R, B, G), y.extent, a));
		}
	}
	function z(m, ...T) {
		if (this.__zooming) {
			var y = M(this, T).event(m),
				b = m.changedTouches,
				k = b.length,
				D,
				R;
			for (
				Fn(m),
					h && clearTimeout(h),
					h = setTimeout(function () {
						h = null;
					}, d),
					D = 0;
				D < k;
				++D
			)
				(R = b[D]),
					y.touch0 && y.touch0[2] === R.identifier
						? delete y.touch0
						: y.touch1 && y.touch1[2] === R.identifier && delete y.touch1;
			if ((y.touch1 && !y.touch0 && ((y.touch0 = y.touch1), delete y.touch1), y.touch0))
				y.touch0[1] = this.__zoom.invert(y.touch0[0]);
			else if (
				(y.end(), y.taps === 2 && ((R = Ht(R, this)), Math.hypot(f[0] - R[0], f[1] - R[1]) < _))
			) {
				var B = ht(this).on('dblclick.zoom');
				B && B.apply(this, arguments);
			}
		}
	}
	return (
		(g.wheelDelta = function (m) {
			return arguments.length ? ((r = typeof m == 'function' ? m : Be(+m)), g) : r;
		}),
		(g.filter = function (m) {
			return arguments.length ? ((t = typeof m == 'function' ? m : Be(!!m)), g) : t;
		}),
		(g.touchable = function (m) {
			return arguments.length ? ((i = typeof m == 'function' ? m : Be(!!m)), g) : i;
		}),
		(g.extent = function (m) {
			return arguments.length
				? ((e =
						typeof m == 'function'
							? m
							: Be([
									[+m[0][0], +m[0][1]],
									[+m[1][0], +m[1][1]]
								])),
					g)
				: e;
		}),
		(g.scaleExtent = function (m) {
			return arguments.length ? ((o[0] = +m[0]), (o[1] = +m[1]), g) : [o[0], o[1]];
		}),
		(g.translateExtent = function (m) {
			return arguments.length
				? ((a[0][0] = +m[0][0]),
					(a[1][0] = +m[1][0]),
					(a[0][1] = +m[0][1]),
					(a[1][1] = +m[1][1]),
					g)
				: [
						[a[0][0], a[0][1]],
						[a[1][0], a[1][1]]
					];
		}),
		(g.constrain = function (m) {
			return arguments.length ? ((n = m), g) : n;
		}),
		(g.duration = function (m) {
			return arguments.length ? ((s = +m), g) : s;
		}),
		(g.interpolate = function (m) {
			return arguments.length ? ((l = m), g) : l;
		}),
		(g.on = function () {
			var m = u.on.apply(u, arguments);
			return m === u ? g : m;
		}),
		(g.clickDistance = function (m) {
			return arguments.length ? ((x = (m = +m) * m), g) : Math.sqrt(x);
		}),
		(g.tapDistance = function (m) {
			return arguments.length ? ((_ = +m), g) : _;
		}),
		g
	);
}
function Qf(t) {
	return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function Kf(t, { delay: e = 0, speed: n, duration: r, easing: i = Qf } = {}) {
	let o = t.getTotalLength();
	const a = getComputedStyle(t);
	return (
		a.strokeLinecap !== 'butt' && (o += parseInt(a.strokeWidth)),
		r === void 0 ? (n === void 0 ? (r = 800) : (r = o / n)) : typeof r == 'function' && (r = r(o)),
		{
			delay: e,
			duration: r,
			easing: i,
			css: (s, l) => `
			stroke-dasharray: ${o};
			stroke-dashoffset: ${l * o};
		`
		}
	);
}
function jf(t) {
	let e;
	return {
		c() {
			(e = Me('svg')), this.h();
		},
		l(n) {
			e = Te(n, 'svg', { viewBox: !0, style: !0, id: !0 });
			var r = Q(e);
			r.forEach(N), this.h();
		},
		h() {
			E(e, 'viewBox', '0 0 50 2'), Ot(e, 'font-size', 2 / 3), E(e, 'id', 'bar');
		},
		m(n, r) {
			H(n, e, r);
		},
		p: ot,
		i: ot,
		o: ot,
		d(n) {
			n && N(e);
		}
	};
}
function th(t, e, n) {
	let { data: r } = e,
		{ colors: i } = e;
	function o(a) {
		let s = document.getElementById('bar');
		if (s)
			for (let l = 0; l < a.length; l++) {
				let u = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				l === 0
					? (u.setAttribute('x', '15'),
						u.setAttribute('y', '0'),
						u.setAttribute('width', `${a[l] * 20}`),
						u.setAttribute('height', '2'),
						u.setAttribute('fill', i[l]))
					: (u.setAttribute('x', `${a[l - 1] * 20 + 15}`),
						u.setAttribute('y', '0'),
						u.setAttribute('width', `${a[l] * 20}`),
						u.setAttribute('height', '2'),
						u.setAttribute('fill', i[l])),
					s.appendChild(u);
			}
	}
	return (
		(t.$$set = (a) => {
			'data' in a && n(0, (r = a.data)), 'colors' in a && n(1, (i = a.colors));
		}),
		(t.$$.update = () => {
			t.$$.dirty & 1 && (document.getElementById('bar') ? o(r) : Ae(() => o(r)));
		}),
		[r, i]
	);
}
class eh extends Ee {
	constructor(e) {
		super(), Ue(this, e, th, jf, Ne, { data: 0, colors: 1 });
	}
}
function Mi(t, e, n) {
	const r = t.slice();
	return (r[15] = e[n]), (r[17] = n), r;
}
function Ti(t) {
	let e, n, r, i, o, a, s;
	function l() {
		return t[6](t[15]);
	}
	function u() {
		return t[7](t[15]);
	}
	function c(...f) {
		return t[8](t[15], ...f);
	}
	return {
		c() {
			(e = Me('path')), this.h();
		},
		l(f) {
			(e = Te(f, 'path', { d: !0, class: !0, fill: !0, role: !0, tabindex: !0, 'aria-label': !0 })),
				Q(e).forEach(N),
				this.h();
		},
		h() {
			E(e, 'd', (n = t[4](t[15]))),
				E(e, 'class', 'state svelte-12nkn9d'),
				E(e, 'fill', (r = t[3][t[15].properties.name] ? t[3][t[15].properties.name][0] : 'white')),
				E(e, 'role', 'button'),
				E(e, 'tabindex', '0'),
				E(e, 'aria-label', (i = t[15].properties.name));
		},
		m(f, h) {
			H(f, e, h), a || ((s = [Lt(e, 'click', l), Lt(e, 'focus', u), Lt(e, 'keyup', c)]), (a = !0));
		},
		p(f, h) {
			(t = f),
				h & 1 && n !== (n = t[4](t[15])) && E(e, 'd', n),
				h & 9 &&
					r !== (r = t[3][t[15].properties.name] ? t[3][t[15].properties.name][0] : 'white') &&
					E(e, 'fill', r),
				h & 1 && i !== (i = t[15].properties.name) && E(e, 'aria-label', i);
		},
		i(f) {
			f &&
				(o ||
					Eo(() => {
						(o = Io(e, Kf, { delay: t[17] * 10, duration: 1e3 })), o.start();
					}));
		},
		o: ot,
		d(f) {
			f && N(e), (a = !1), Si(s);
		}
	};
}
function ki(t) {
	let e, n;
	return {
		c() {
			(e = Me('path')), this.h();
		},
		l(r) {
			(e = Te(r, 'path', { d: !0, fill: !0, stroke: !0, 'stroke-width': !0 })),
				Q(e).forEach(N),
				this.h();
		},
		h() {
			E(e, 'd', (n = t[4](t[1]))),
				E(e, 'fill', 'hsl(0 0% 50% / 20%)'),
				E(e, 'stroke', 'black'),
				E(e, 'stroke-width', 2);
		},
		m(r, i) {
			H(r, e, i);
		},
		p(r, i) {
			i & 2 && n !== (n = r[4](r[1])) && E(e, 'd', n);
		},
		d(r) {
			r && N(e);
		}
	};
}
function $i(t) {
	let e = t[1].properties.name + '',
		n,
		r,
		i,
		o,
		a,
		s,
		l,
		u,
		c = Math.round(t[3][t[1].properties.name][2][0] * 100) + '',
		f,
		h,
		d = Math.round(t[3][t[1].properties.name][2][1] * 100) + '',
		p,
		x;
	return (
		(l = new eh({
			props: { data: t[3][t[1].properties.name][2], colors: ['#ff7676', '#7676ff'] }
		})),
		{
			c() {
				(n = Nt(e)),
					(r = tt()),
					(i = X('br')),
					(o = tt()),
					(a = X('br')),
					(s = tt()),
					Ie(l.$$.fragment),
					(u = tt()),
					(f = Nt(c)),
					(h = Nt(' : ')),
					(p = Nt(d));
			},
			l(_) {
				(n = At(_, e)),
					(r = et(_)),
					(i = Z(_, 'BR', {})),
					(o = et(_)),
					(a = Z(_, 'BR', {})),
					(s = et(_)),
					Fe(l.$$.fragment, _),
					(u = et(_)),
					(f = At(_, c)),
					(h = At(_, ' : ')),
					(p = At(_, d));
			},
			m(_, g) {
				H(_, n, g),
					H(_, r, g),
					H(_, i, g),
					H(_, o, g),
					H(_, a, g),
					H(_, s, g),
					Re(l, _, g),
					H(_, u, g),
					H(_, f, g),
					H(_, h, g),
					H(_, p, g),
					(x = !0);
			},
			p(_, g) {
				(!x || g & 2) && e !== (e = _[1].properties.name + '') && Mn(n, e);
				const w = {};
				g & 10 && (w.data = _[3][_[1].properties.name][2]),
					l.$set(w),
					(!x || g & 10) &&
						c !== (c = Math.round(_[3][_[1].properties.name][2][0] * 100) + '') &&
						Mn(f, c),
					(!x || g & 10) &&
						d !== (d = Math.round(_[3][_[1].properties.name][2][1] * 100) + '') &&
						Mn(p, d);
			},
			i(_) {
				x || (it(l.$$.fragment, _), (x = !0));
			},
			o(_) {
				bt(l.$$.fragment, _), (x = !1);
			},
			d(_) {
				_ && (N(n), N(r), N(i), N(o), N(a), N(s), N(u), N(f), N(h), N(p)), ze(l, _);
			}
		}
	);
}
function nh(t) {
	let e,
		n,
		r,
		i,
		o,
		a,
		s = Sr(t[0]),
		l = [];
	for (let f = 0; f < s.length; f += 1) l[f] = Ti(Mi(t, s, f));
	let u = t[1] && ki(t),
		c = t[1] && $i(t);
	return {
		c() {
			(e = Me('svg')), (n = Me('g'));
			for (let f = 0; f < l.length; f += 1) l[f].c();
			(r = Qe()), u && u.c(), (i = tt()), (o = X('div')), c && c.c(), this.h();
		},
		l(f) {
			e = Te(f, 'svg', { viewBox: !0, id: !0 });
			var h = Q(e);
			n = Te(h, 'g', { fill: !0, stroke: !0 });
			var d = Q(n);
			for (let x = 0; x < l.length; x += 1) l[x].l(d);
			(r = Qe()),
				u && u.l(d),
				d.forEach(N),
				h.forEach(N),
				(i = et(f)),
				(o = Z(f, 'DIV', { class: !0 }));
			var p = Q(o);
			c && c.l(p), p.forEach(N), this.h();
		},
		h() {
			E(n, 'fill', 'white'),
				E(n, 'stroke', 'black'),
				E(e, 'viewBox', '0 0 975 610'),
				E(e, 'id', 'IbR'),
				E(o, 'class', 'selectedName svelte-12nkn9d');
		},
		m(f, h) {
			H(f, e, h), W(e, n);
			for (let d = 0; d < l.length; d += 1) l[d] && l[d].m(n, null);
			W(n, r), u && u.m(n, null), H(f, i, h), H(f, o, h), c && c.m(o, null), (a = !0);
		},
		p(f, [h]) {
			if (h & 31) {
				s = Sr(f[0]);
				let d;
				for (d = 0; d < s.length; d += 1) {
					const p = Mi(f, s, d);
					l[d]
						? (l[d].p(p, h), it(l[d], 1))
						: ((l[d] = Ti(p)), l[d].c(), it(l[d], 1), l[d].m(n, r));
				}
				for (; d < l.length; d += 1) l[d].d(1);
				l.length = s.length;
			}
			f[1] ? (u ? u.p(f, h) : ((u = ki(f)), u.c(), u.m(n, null))) : u && (u.d(1), (u = null)),
				f[1]
					? c
						? (c.p(f, h), h & 2 && it(c, 1))
						: ((c = $i(f)), c.c(), it(c, 1), c.m(o, null))
					: c &&
						(ar(),
						bt(c, 1, 1, () => {
							c = null;
						}),
						ur());
		},
		i(f) {
			if (!a) {
				for (let h = 0; h < s.length; h += 1) it(l[h]);
				it(c), (a = !0);
			}
		},
		o(f) {
			bt(c), (a = !1);
		},
		d(f) {
			f && (N(e), N(i), N(o)), Uo(l, f), u && u.d(), c && c.d();
		}
	};
}
function rh(t, e) {
	return t > e && t - e > 10
		? 'rgb(255, 118, 118)'
		: e > t && e - t > 10
			? 'rgb(118, 118, 255)'
			: t > e
				? 'rgb(198, 118, 175)'
				: e > t
					? 'rgb(130, 118, 244)'
					: 'rgb(70, 35, 209)';
}
function ih(t, e, n) {
	const r = pa().projection(null);
	let i = [],
		o,
		a,
		s,
		l,
		u = {},
		c = new Date(),
		{ start: f = new Date(c.setDate(c.getDate() - 30)).getTime() } = e,
		h = new Date(f),
		d = new Date(new Date().setDate(c.getDate() - 30));
	h.setHours(0, 0, 0, 0), d.setHours(0, 0, 0, 0);
	let p = new Date(new Date(h).getTime() + 30 * 24 * 60 * 60 * 1e3).getTime();
	Ae(async () => {
		let w = JSON.parse(localStorage.getItem('statesTopoJSON') || '{}');
		Object.keys(w).length === 0 &&
			((w = await fetch('/topojson/states-albers-10m.json').then((I) => I.json())),
			localStorage.setItem('statesTopoJSON', JSON.stringify(w))),
			n(0, (i = Lo(w, w.objects.states).features));
		let $ = h.getTime() == d.getTime() ? 'IbR' : 'IbR-2020',
			F = JSON.parse(localStorage.getItem($) || '{}'),
			U = '&geo=US&time=30&endTime=' + p;
		F && Date.now() - Number(F.timestamp) < 1e3 * 60 * 60 * 24
			? ((s = F.trump), (l = F.biden))
			: ((s = await fetch('/api/IbR?keyword=Trump' + U).then((I) => I.json())),
				(l = await fetch('/api/IbR?keyword=Biden' + U).then((I) => I.json())),
				localStorage.setItem(
					$,
					JSON.stringify({ trump: s, biden: l, timestamp: Date.now(), query: U })
				),
				console.log('Reset cached data.'));
		for (const I of i) {
			const L = I.properties.name;
			let O = [],
				A;
			for (let z of s) z.geoName === L && O.push(Number(z.value));
			for (let z of l) z.geoName === L && O.push(Number(z.value));
			let Y = O[0] + O[1];
			(A = rh(O[0], O[1])), n(3, (u[L] = [A, Math.max(...O), [O[0] / Y, O[1] / Y]]), u);
		}
		function M(I) {
			ht('svg g').attr('transform', I.transform);
		}
		let C = Jf()
			.scaleExtent([1, 5])
			.translateExtent([
				[0, 0],
				[975, 610]
			])
			.on('zoom', M);
		ht('#IbR').call(C);
	});
	const x = (w) => n(1, (o = w)),
		_ = (w) => n(2, (a = w)),
		g = (w, $) => {
			$.key === 'Enter' && a === w && n(1, (o = w));
		};
	return (
		(t.$$set = (w) => {
			'start' in w && n(5, (f = w.start));
		}),
		[i, o, a, u, r, f, x, _, g]
	);
}
class Ao extends Ee {
	constructor(e) {
		super(), Ue(this, e, ih, nh, Ne, { start: 5 });
	}
}
function oh(t) {
	let e,
		n =
			'<svg id="IoT" viewBox="0 0 975 610"></svg> <div id="flex-contianer" class="svelte-1fsuwq7"><div class="tooltip svelte-1fsuwq7"><div id="tooltip" style="display: none;"></div></div></div>';
	return {
		c() {
			(e = X('div')), (e.innerHTML = n), this.h();
		},
		l(r) {
			(e = Z(r, 'DIV', { class: !0, 'data-svelte-h': !0 })),
				wt(e) !== 'svelte-1jx6rql' && (e.innerHTML = n),
				this.h();
		},
		h() {
			E(e, 'class', 'svg-container svelte-1fsuwq7');
		},
		m(r, i) {
			H(r, e, i);
		},
		p: ot,
		i: ot,
		o: ot,
		d(r) {
			r && N(e);
		}
	};
}
let ah = 'US',
	uh = 30;
function sh(t) {
	let e = [],
		n = ['Joe Biden', 'Donald Trump'];
	async function r() {
		const s = new URLSearchParams();
		n.forEach((f) => s.append('keyword', f)), s.append('geo', ah), s.append('time', String(uh));
		const u = await (await fetch(`/api/IoT?${s.toString()}`)).json();
		e = i(u);
		const c = { data: u, timestamp: new Date().getTime() };
		localStorage.setItem('iotData', JSON.stringify(c)), a();
	}
	function i(s) {
		return n.map((u, c) =>
			s.map((f) => ({ time: new Date(Number(f.time) * 1e3), value: f.value[c] }))
		);
	}
	function o() {
		const s = localStorage.getItem('iotData');
		if (s) {
			const { data: l, timestamp: u } = JSON.parse(s),
				c = 24 * 60 * 60 * 1e3;
			if (new Date().getTime() - u < c) return i(l);
		}
		return null;
	}
	Ae(() => {
		const s = o();
		s ? ((e = s), a()) : r();
	});
	function a() {
		const s = { top: 20, right: 40, bottom: 30, left: 40 },
			l = 975 - s.left - s.right,
			u = 610 - s.top - s.bottom,
			c = ht('#IoT').append('g').attr('transform', `translate(${s.left},${s.top})`),
			f = zf()
				.domain(Bo(e[0], (p) => new Date(p.time)))
				.range([0, l]),
			h = wr()
				.domain([0, jo(e.flat(), (p) => p.value)])
				.nice()
				.range([u, 0]);
		c.append('g').attr('transform', `translate(0,${u})`).call(Hi(f)), c.append('g').call(Yi(h));
		const d = Vf()
			.x((p) => f(p.time))
			.y((p) => h(p.value));
		n.forEach((p, x) => {
			const _ = c
					.append('path')
					.datum(e[x])
					.attr('fill', 'none')
					.attr('stroke', x === 0 ? 'rgb(118, 118, 255)' : 'rgb(255, 118, 118)')
					.attr('stroke-width', 1.5)
					.attr('d', d),
				g = _.node().getTotalLength();
			_.attr('stroke-dasharray', `${g} ${g}`)
				.attr('stroke-dashoffset', g)
				.transition()
				.duration(2e3)
				.attr('stroke-dashoffset', 0),
				c
					.transition()
					.duration(1e3)
					.delay((w, $) => $ * 50),
				c
					.selectAll(`circle-${x}`)
					.data(e[x])
					.enter()
					.append('circle')
					.attr('r', 6)
					.attr('cx', (w) => f(w.time))
					.attr('cy', (w) => h(w.value))
					.attr('fill', x === 0 ? 'rgb(118, 118, 255)' : 'rgb(255, 118, 118)')
					.attr('opacity', 0)
					.attr('opacity', 1)
					.on('mouseover', function (w, $) {
						ht('#tooltip').style('display', 'block').text(`Value: ${$.value}. 
 Time: ${new Date($.time).toDateString()}`);
					})
					.on('mouseout', function () {
						ht('#tooltip').style('display', 'none');
					});
		});
	}
	return [];
}
class lh extends Ee {
	constructor(e) {
		super(), Ue(this, e, sh, oh, Ne, {});
	}
}
function ch(t) {
	let e;
	return {
		c() {
			e = Nt('Trump');
		},
		l(n) {
			e = At(n, 'Trump');
		},
		m(n, r) {
			H(n, e, r);
		},
		d(n) {
			n && N(e);
		}
	};
}
function fh(t) {
	let e;
	return {
		c() {
			e = Nt('Biden');
		},
		l(n) {
			e = At(n, 'Biden');
		},
		m(n, r) {
			H(n, e, r);
		},
		d(n) {
			n && N(e);
		}
	};
}
function hh(t) {
	let e,
		n =
			'<h5 class="svelte-bdsaw7">News Trends</h5> <div id="sentiment" class="svelte-bdsaw7"><p class="svelte-bdsaw7">Average news sentiment from the past 7 days.<br class="svelte-bdsaw7"/>Ranges from -1 to 1; -1 is the most negative and 1 is the most positive.</p></div>',
		r,
		i,
		o,
		a,
		s,
		l,
		u,
		c = 'Show News on Biden',
		f,
		h,
		d,
		p,
		x,
		_ = 'Show News on Trump',
		g,
		w,
		$,
		F;
	function U(I, L) {
		return I[0] == 'none' ? fh : ch;
	}
	let M = U(t),
		C = M(t);
	return {
		c() {
			(e = X('div')),
				(e.innerHTML = n),
				(r = tt()),
				(i = X('div')),
				(o = X('h5')),
				(a = Nt('Latest Articles Relating to ')),
				C.c(),
				(s = tt()),
				(l = X('div')),
				(u = X('button')),
				(u.textContent = c),
				(f = tt()),
				(h = X('ul')),
				(d = tt()),
				(p = X('div')),
				(x = X('button')),
				(x.textContent = _),
				(g = tt()),
				(w = X('ul')),
				this.h();
		},
		l(I) {
			(e = Z(I, 'DIV', { id: !0, class: !0, 'data-svelte-h': !0 })),
				wt(e) !== 'svelte-1wu6a5k' && (e.innerHTML = n),
				(r = et(I)),
				(i = Z(I, 'DIV', { id: !0, class: !0 }));
			var L = Q(i);
			o = Z(L, 'H5', { class: !0 });
			var O = Q(o);
			(a = At(O, 'Latest Articles Relating to ')),
				C.l(O),
				O.forEach(N),
				(s = et(L)),
				(l = Z(L, 'DIV', { style: !0, class: !0 }));
			var A = Q(l);
			(u = Z(A, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				wt(u) !== 'svelte-1nlg8te' && (u.textContent = c),
				(f = et(A)),
				(h = Z(A, 'UL', { id: !0, class: !0 })),
				Q(h).forEach(N),
				A.forEach(N),
				(d = et(L)),
				(p = Z(L, 'DIV', { style: !0, class: !0 }));
			var Y = Q(p);
			(x = Z(Y, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
				wt(x) !== 'svelte-1moknm2' && (x.textContent = _),
				(g = et(Y)),
				(w = Z(Y, 'UL', { id: !0, class: !0 })),
				Q(w).forEach(N),
				Y.forEach(N),
				L.forEach(N),
				this.h();
		},
		h() {
			E(e, 'id', 'newsTrends'),
				E(e, 'class', 'svelte-bdsaw7'),
				E(o, 'class', 'svelte-bdsaw7'),
				E(u, 'class', 'svelte-bdsaw7'),
				E(h, 'id', 'trumpArticles'),
				E(h, 'class', 'svelte-bdsaw7'),
				Ot(l, 'display', t[0]),
				E(l, 'class', 'svelte-bdsaw7'),
				E(x, 'class', 'svelte-bdsaw7'),
				E(w, 'id', 'bidenArticles'),
				E(w, 'class', 'svelte-bdsaw7'),
				Ot(p, 'display', t[1]),
				E(p, 'class', 'svelte-bdsaw7'),
				E(i, 'id', 'news'),
				E(i, 'class', 'svelte-bdsaw7');
		},
		m(I, L) {
			H(I, e, L),
				H(I, r, L),
				H(I, i, L),
				W(i, o),
				W(o, a),
				C.m(o, null),
				W(i, s),
				W(i, l),
				W(l, u),
				W(l, f),
				W(l, h),
				W(i, d),
				W(i, p),
				W(p, x),
				W(p, g),
				W(p, w),
				$ || ((F = [Lt(u, 'click', t[2]), Lt(x, 'click', t[2])]), ($ = !0));
		},
		p(I, [L]) {
			M !== (M = U(I)) && (C.d(1), (C = M(I)), C && (C.c(), C.m(o, null))),
				L & 1 && Ot(l, 'display', I[0]),
				L & 2 && Ot(p, 'display', I[1]);
		},
		i: ot,
		o: ot,
		d(I) {
			I && (N(e), N(r), N(i)), C.d(), ($ = !1), Si(F);
		}
	};
}
async function dh() {
	const e = await (await fetch('/api/news')).json();
	return (
		localStorage.setItem('newsData', JSON.stringify({ data: e, timestamp: new Date().getTime() })),
		e
	);
}
function mh(t, e, n) {
	let r;
	function i() {
		const l = [
				{ name: 'Trump', value: r.trump.averageSentiment, color: 'rgb(255, 118, 118)' },
				{ name: 'Biden', value: r.biden.averageSentiment, color: 'rgb(118, 118, 255)' }
			],
			u = { top: 20, right: 40, bottom: 30, left: 40 },
			c = 644 - u.left - u.right,
			f = 150 - u.top - u.bottom,
			h = ht('#sentiment')
				.append('svg')
				.attr('width', c + u.left + u.right)
				.attr('height', f + u.top + u.bottom)
				.append('g')
				.attr('transform', `translate(${u.left},${u.top})`),
			d = wr().domain([-1, 1]).range([0, c]),
			p = vo()
				.domain(l.map((g) => g.name))
				.range([0, f])
				.padding(0.5),
			x = (g) => g.attr('transform', `translate(0,${f})`).call((w) => w.select('.domain').remove()),
			_ = (g) => g.call(Yi(p).tickSize(0)).call((w) => w.select('.domain').remove());
		h
			.append('g')
			.selectAll('.bar')
			.data(l)
			.join('rect')
			.attr('class', (g) => `bar ${g.value < 0 ? 'negative' : ''}`)
			.attr('fill', (g) => g.color)
			.attr('x', (g) => d(Math.min(0, g.value)))
			.attr('y', (g) => p(g.name))
			.attr('width', (g) => Math.abs(d(g.value) - d(0)))
			.attr('height', p.bandwidth()),
			h
				.append('line')
				.attr('x1', d(0))
				.attr('x2', d(0))
				.attr('y1', 0)
				.attr('y2', f)
				.attr('stroke', '#c9c9c9')
				.attr('stroke-width', 1),
			h
				.append('line')
				.attr('x1', d(-1))
				.attr('x2', d(1))
				.attr('y1', f)
				.attr('y2', f)
				.attr('stroke', '#c9c9c9')
				.attr('stroke-width', 1),
			h
				.append('g')
				.attr('transform', `translate(0,${f})`)
				.call(Hi(d).tickValues([-1, -0.5, 0, 0.5, 1])),
			h.append('g').call(x),
			h.append('g').call(_);
		for (const g of r.trump.latest) {
			let w = document.createElement('li');
			(w.innerHTML = `<a href=${g.url}>${g.title}</a>`),
				document.getElementById('trumpArticles').appendChild(w);
		}
		for (const g of r.biden.latest) {
			let w = document.createElement('li');
			(w.innerHTML = `<a href=${g.url}>${g.title}</a>`),
				document.getElementById('bidenArticles').appendChild(w);
		}
	}
	Ae(async () => {
		const l = JSON.parse(localStorage.getItem('newsData') || '{}');
		l && Date.now() - Number(l.timestamp) < 1e3 * 60 * 60 * 24 ? (r = l.data) : (r = await dh()),
			i();
	});
	let o = 'none',
		a = 'block';
	function s() {
		o == 'none'
			? (n(0, (o = 'block')), n(1, (a = 'none')))
			: (n(0, (o = 'none')), n(1, (a = 'block')));
	}
	return [o, a, s];
}
class gh extends Ee {
	constructor(e) {
		super(), Ue(this, e, mh, hh, Ne, {});
	}
}
function ph(t) {
	let e,
		n,
		r =
			'<span id="election" class="svelte-3lxw9h">Election</span><span id="book" class="svelte-3lxw9h">Book</span>',
		i,
		o,
		a = 'Using the internet to look at political trends across the nation.',
		s,
		l,
		u = 'Trump vs. Biden',
		c,
		f,
		h = 'As per google search trends over the past 30 days',
		d,
		p,
		x,
		_,
		g,
		w,
		$,
		F,
		U,
		M,
		C,
		I,
		L,
		O;
	function A(b, k) {
		return b[0] ? vh : _h;
	}
	let Y = A(t),
		z = Y(t);
	const m = [bh, xh, wh],
		T = [];
	function y(b, k) {
		return b[0] ? 0 : b[2] ? 1 : 2;
	}
	return (
		(w = y(t)),
		($ = T[w] = m[w](t)),
		(C = new gh({})),
		{
			c() {
				(e = X('div')),
					(n = X('h1')),
					(n.innerHTML = r),
					(i = tt()),
					(o = X('p')),
					(o.textContent = a),
					(s = tt()),
					(l = X('h5')),
					(l.textContent = u),
					(c = tt()),
					(f = X('p')),
					(f.textContent = h),
					(d = tt()),
					(p = X('div')),
					(x = X('button')),
					z.c(),
					(_ = tt()),
					(g = X('div')),
					$.c(),
					(F = tt()),
					(U = X('div')),
					(M = X('div')),
					Ie(C.$$.fragment),
					this.h();
			},
			l(b) {
				e = Z(b, 'DIV', {});
				var k = Q(e);
				(n = Z(k, 'H1', { class: !0, 'data-svelte-h': !0 })),
					wt(n) !== 'svelte-6u8u1m' && (n.innerHTML = r),
					(i = et(k)),
					(o = Z(k, 'P', { class: !0, 'data-svelte-h': !0 })),
					wt(o) !== 'svelte-ian4hn' && (o.textContent = a),
					(s = et(k)),
					(l = Z(k, 'H5', { style: !0, 'data-svelte-h': !0 })),
					wt(l) !== 'svelte-com80i' && (l.textContent = u),
					(c = et(k)),
					(f = Z(k, 'P', { style: !0, class: !0, 'data-svelte-h': !0 })),
					wt(f) !== 'svelte-185lwes' && (f.textContent = h),
					(d = et(k)),
					(p = Z(k, 'DIV', { class: !0 }));
				var D = Q(p);
				x = Z(D, 'BUTTON', { class: !0 });
				var R = Q(x);
				z.l(R), R.forEach(N), D.forEach(N), (_ = et(k)), (g = Z(k, 'DIV', { class: !0 }));
				var B = Q(g);
				$.l(B), B.forEach(N), (F = et(k)), (U = Z(k, 'DIV', { class: !0 }));
				var G = Q(U);
				M = Z(G, 'DIV', { class: !0, id: !0 });
				var rt = Q(M);
				Fe(C.$$.fragment, rt), rt.forEach(N), G.forEach(N), k.forEach(N), this.h();
			},
			h() {
				E(n, 'class', 'svelte-3lxw9h'),
					E(o, 'class', 'svelte-3lxw9h'),
					Ot(l, 'text-align', 'center'),
					Ot(f, 'text-align', 'center'),
					E(f, 'class', 'svelte-3lxw9h'),
					E(x, 'class', 'toggle-button svelte-3lxw9h'),
					E(p, 'class', 'button-container svelte-3lxw9h'),
					E(g, 'class', 'container svelte-3lxw9h'),
					E(M, 'class', 'item svelte-3lxw9h'),
					E(M, 'id', 'news-holder'),
					E(U, 'class', 'container svelte-3lxw9h');
			},
			m(b, k) {
				H(b, e, k),
					W(e, n),
					W(e, i),
					W(e, o),
					W(e, s),
					W(e, l),
					W(e, c),
					W(e, f),
					W(e, d),
					W(e, p),
					W(p, x),
					z.m(x, null),
					W(e, _),
					W(e, g),
					T[w].m(g, null),
					W(e, F),
					W(e, U),
					W(U, M),
					Re(C, M, null),
					(I = !0),
					L || ((O = Lt(x, 'click', t[3])), (L = !0));
			},
			p(b, k) {
				Y !== (Y = A(b)) && (z.d(1), (z = Y(b)), z && (z.c(), z.m(x, null)));
				let D = w;
				(w = y(b)),
					w === D
						? T[w].p(b, k)
						: (ar(),
							bt(T[D], 1, 1, () => {
								T[D] = null;
							}),
							ur(),
							($ = T[w]),
							$ ? $.p(b, k) : (($ = T[w] = m[w](b)), $.c()),
							it($, 1),
							$.m(g, null));
			},
			i(b) {
				I || (it($), it(C.$$.fragment, b), (I = !0));
			},
			o(b) {
				bt($), bt(C.$$.fragment, b), (I = !1);
			},
			d(b) {
				b && N(e), z.d(), T[w].d(), ze(C), (L = !1), O();
			}
		}
	);
}
function yh(t) {
	let e,
		n = 'Please view website in landscape';
	return {
		c() {
			(e = X('div')), (e.textContent = n), this.h();
		},
		l(r) {
			(e = Z(r, 'DIV', { class: !0, 'data-svelte-h': !0 })),
				wt(e) !== 'svelte-17mnhno' && (e.textContent = n),
				this.h();
		},
		h() {
			E(e, 'class', 'landscape-message svelte-3lxw9h');
		},
		m(r, i) {
			H(r, e, i);
		},
		p: ot,
		i: ot,
		o: ot,
		d(r) {
			r && N(e);
		}
	};
}
function _h(t) {
	let e;
	return {
		c() {
			e = Nt('Show Interest over Time');
		},
		l(n) {
			e = At(n, 'Show Interest over Time');
		},
		m(n, r) {
			H(n, e, r);
		},
		d(n) {
			n && N(e);
		}
	};
}
function vh(t) {
	let e;
	return {
		c() {
			e = Nt('Show Interest by Region');
		},
		l(n) {
			e = At(n, 'Show Interest by Region');
		},
		m(n, r) {
			H(n, e, r);
		},
		d(n) {
			n && N(e);
		}
	};
}
function wh(t) {
	let e,
		n = 'Compare with 2020 Data',
		r,
		i,
		o,
		a,
		s,
		l;
	return (
		(o = new Ao({})),
		{
			c() {
				(e = X('button')),
					(e.textContent = n),
					(r = tt()),
					(i = X('div')),
					Ie(o.$$.fragment),
					this.h();
			},
			l(u) {
				(e = Z(u, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
					wt(e) !== 'svelte-1f77kou' && (e.textContent = n),
					(r = et(u)),
					(i = Z(u, 'DIV', { class: !0, id: !0 }));
				var c = Q(i);
				Fe(o.$$.fragment, c), c.forEach(N), this.h();
			},
			h() {
				E(e, 'class', 'toggle-button svelte-3lxw9h'),
					E(i, 'class', 'item svelte-3lxw9h'),
					E(i, 'id', 'IbR-holder');
			},
			m(u, c) {
				H(u, e, c),
					H(u, r, c),
					H(u, i, c),
					Re(o, i, null),
					(a = !0),
					s || ((l = Lt(e, 'click', t[4])), (s = !0));
			},
			p: ot,
			i(u) {
				a || (it(o.$$.fragment, u), (a = !0));
			},
			o(u) {
				bt(o.$$.fragment, u), (a = !1);
			},
			d(u) {
				u && (N(e), N(r), N(i)), ze(o), (s = !1), l();
			}
		}
	);
}
function xh(t) {
	let e,
		n = 'Compare with Current Data',
		r,
		i,
		o,
		a,
		s,
		l;
	return (
		(o = new Ao({
			props: { start: new Date(Date.now() - 4 * 365 * 24 * 60 * 60 * 1e3).getTime() }
		})),
		{
			c() {
				(e = X('button')),
					(e.textContent = n),
					(r = tt()),
					(i = X('div')),
					Ie(o.$$.fragment),
					this.h();
			},
			l(u) {
				(e = Z(u, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
					wt(e) !== 'svelte-y8ul31' && (e.textContent = n),
					(r = et(u)),
					(i = Z(u, 'DIV', { class: !0, id: !0 }));
				var c = Q(i);
				Fe(o.$$.fragment, c), c.forEach(N), this.h();
			},
			h() {
				E(e, 'class', 'toggle-button svelte-3lxw9h'),
					E(i, 'class', 'item svelte-3lxw9h'),
					E(i, 'id', 'IbR-holder');
			},
			m(u, c) {
				H(u, e, c),
					H(u, r, c),
					H(u, i, c),
					Re(o, i, null),
					(a = !0),
					s || ((l = Lt(e, 'click', t[4])), (s = !0));
			},
			p: ot,
			i(u) {
				a || (it(o.$$.fragment, u), (a = !0));
			},
			o(u) {
				bt(o.$$.fragment, u), (a = !1);
			},
			d(u) {
				u && (N(e), N(r), N(i)), ze(o), (s = !1), l();
			}
		}
	);
}
function bh(t) {
	let e, n, r;
	return (
		(n = new lh({})),
		{
			c() {
				(e = X('div')), Ie(n.$$.fragment), this.h();
			},
			l(i) {
				e = Z(i, 'DIV', { class: !0, id: !0 });
				var o = Q(e);
				Fe(n.$$.fragment, o), o.forEach(N), this.h();
			},
			h() {
				E(e, 'class', 'item svelte-3lxw9h'), E(e, 'id', 'IoT-holder');
			},
			m(i, o) {
				H(i, e, o), Re(n, e, null), (r = !0);
			},
			p: ot,
			i(i) {
				r || (it(n.$$.fragment, i), (r = !0));
			},
			o(i) {
				bt(n.$$.fragment, i), (r = !1);
			},
			d(i) {
				i && N(e), ze(n);
			}
		}
	);
}
function Mh(t) {
	let e, n, r, i;
	const o = [yh, ph],
		a = [];
	function s(l, u) {
		return l[1] ? 0 : 1;
	}
	return (
		(e = s(t)),
		(n = a[e] = o[e](t)),
		{
			c() {
				n.c(), (r = Qe());
			},
			l(l) {
				n.l(l), (r = Qe());
			},
			m(l, u) {
				a[e].m(l, u), H(l, r, u), (i = !0);
			},
			p(l, [u]) {
				let c = e;
				(e = s(l)),
					e === c
						? a[e].p(l, u)
						: (ar(),
							bt(a[c], 1, 1, () => {
								a[c] = null;
							}),
							ur(),
							(n = a[e]),
							n ? n.p(l, u) : ((n = a[e] = o[e](l)), n.c()),
							it(n, 1),
							n.m(r.parentNode, r));
			},
			i(l) {
				i || (it(n), (i = !0));
			},
			o(l) {
				bt(n), (i = !1);
			},
			d(l) {
				l && N(r), a[e].d(l);
			}
		}
	);
}
function Th(t, e, n) {
	let r = !0,
		i = !1,
		o = !1;
	function a() {
		n(0, (r = !r));
	}
	function s() {
		n(2, (o = !o));
	}
	Ae(() => {
		l(), window.addEventListener('resize', l);
	});
	function l() {
		window.innerHeight > window.innerWidth ? n(1, (i = !0)) : n(1, (i = !1));
	}
	return [r, i, o, a, s];
}
class Sh extends Ee {
	constructor(e) {
		super(), Ue(this, e, Th, Mh, Ne, {});
	}
}
export { Sh as component };
