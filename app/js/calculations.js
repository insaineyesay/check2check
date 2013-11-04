			var testResults = function (name, date, amount) {

				name = document.getElementById("billName").value;
				date = document.getElementById("billDueDate").value;
				amount = document.getElementById("billAmount").value;

				console.log('congratulations you just logged ' + name + ' ' + date + ' ' + amount + '!');
				console.log(amount);
				var total = amount * 2;
				console.log(total);
			};
