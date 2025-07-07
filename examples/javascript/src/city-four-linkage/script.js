import area from "./area.js"

var province = document.querySelector(".province-item");
			var city = document.querySelector(".city-item");
			var region = document.querySelector(".region-item");
			var street = document.querySelector(".street-item");
			var btn = document.querySelector("#btn");
			var main = document.querySelector("main");
			var spanBtn = document.querySelector(".btn");
			var closeobj = document.querySelector("#close");

			for (let key in area) {
				var span = document.createElement("span");
				span.innerText = key;
				span.onclick = function (e) {
					document.querySelector(".city").style.display = "none";
					document.querySelector(".region").style.display = "none";
					document.querySelector(".street").style.display = "none";
					city.innerHTML = "";
					region.innerHTML = "";
					street.innerHTML = "";
					btn.style.display = "none";
					var active = this.parentElement.querySelector(".active");
					if (active) {
						active.classList.remove("active");
					}
					this.classList.add("active");
					createCity(this);
				};
				province.appendChild(span);
			}

			function createCity(self) {
				document.querySelector(".city").style.display = "flex";
				var cityObj = area[self.innerText][0];
				for (let key in cityObj) {
					var span = document.createElement("span");
					span.innerText = key;
					span.onclick = function (e) {
						document.querySelector(".region").style.display = "none";
						document.querySelector(".street").style.display = "none";
						region.innerHTML = "";
						street.innerHTML = "";
						btn.style.display = "none";
						var active = this.parentElement.querySelector(".active");
						if (active) {
							active.classList.remove("active");
						}
						this.classList.add("active");
						// createCity(this);
						createRegion(this);
					};
					city.appendChild(span);
				}
			}
			function createRegion(self) {
				document.querySelector(".region").style.display = "flex";
				var cityObj =
					area[document.querySelector(".province .active").innerText][0][self.innerText];
				console.log(cityObj);
				for (var i = 0; i < cityObj.length; i++) {
					for (let key in cityObj[i]) {
						var span = document.createElement("span");
						span.innerText = key;
						span.onclick = function (e) {
							document.querySelector(".street").style.display = "none";
							street.innerHTML = "";
							btn.style.display = "none";
							var active = this.parentElement.querySelector(".active");
							if (active) {
								active.classList.remove("active");
							}
							this.classList.add("active");
							// createCity(this);
							// createRegion(this);

							createStreet(this);
						};
						region.appendChild(span);
					}
				}
			}
			function createStreet(self) {
				document.querySelector(".street").style.display = "flex";
				var cityObj =
					area[document.querySelector(".province .active").innerText][0][
						document.querySelector(".city .active").innerText
					];
				var str = "";
				for (let i = 0; i < cityObj.length; i++) {
					for (let key in cityObj[i]) {
						if (key == self.innerText) {
							str = cityObj[i][key];
						}
					}
				}
				var arr = str.split("、");
				arr.forEach(function (item, index) {
					var span = document.createElement("span");
					span.innerText = item;
					span.onclick = function (e) {
						var active = this.parentElement.querySelector(".active");
						if (active) {
							active.classList.remove("active");
						}
						this.classList.add("active");
						// createCity(this);
						// createRegion(this);
						btn.style.display = "block";
					};
					street.appendChild(span);
				});
				console.log(arr);
			}
			btn.onclick = function () {
				var arr = document.querySelector(".center").children;
				console.log(arr);
				arr[0].innerText = document.querySelector(".province .active").innerText;
				arr[1].innerText = document.querySelector(".city .active").innerText;
				arr[2].innerText = document.querySelector(".region .active").innerText;
				arr[3].innerText = document.querySelector(".street .active").innerText;
				main.style.display = "none";
			};
			spanBtn.onclick = function () {
				main.style.display = "block";
			};
			closeobj.onclick = () => (main.style.display = "none");