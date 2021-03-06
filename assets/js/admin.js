jQuery(document).ready(function ($) {
	$(document).on('click', '#reepay_capture', function (e) {
		e.preventDefault();
		var nonce = $(this).data('nonce');
		var order_id = $(this).data('order-id');
		var self = $(this);
		
		$.ajax({
			url       : Reepay_Admin.ajax_url,
			type      : 'POST',
			data      : {
				action        : 'reepay_capture',
				nonce         : nonce,
				order_id      : order_id
			},
			beforeSend: function () {
				self.data('text', self.html());
				self.html(Reepay_Admin.text_wait);
				self.prop('disabled', true);
			},
			success   : function (response) {
				self.html(self.data('text'));
				self.prop('disabled', false);
				if (!response.success) {
					return false;
				}

				window.location.href = location.href;
			}
		});
	});

	$(document).on('click', '#reepay_cancel', function (e) {
		e.preventDefault();

		var nonce = $(this).data('nonce');
		var order_id = $(this).data('order-id');
		var self = $(this);
		$.ajax({
			url       : Reepay_Admin.ajax_url,
			type      : 'POST',
			data      : {
				action        : 'reepay_cancel',
				nonce         : nonce,
				order_id      : order_id
			},
			beforeSend: function () {
				self.data('text', self.html());
				self.html(Reepay_Admin.text_wait);
				self.prop('disabled', true);
			},
			success   : function (response) {
				self.html(self.data('text'));
				self.prop('disabled', false);
				if (!response.success) {
					alert(response.data);
					return false;
				}

				window.location.href = location.href;
			}
		});
	});
	
	$(document).on('click', '#reepay_refund', function (e) {
		e.preventDefault();
		var nonce = $(this).data('nonce');
		var order_id = $(this).data('order-id');
		var amount = $(this).data('amount');
		var self = $(this);
		$.ajax({
			url       : Reepay_Admin.ajax_url,
			type      : 'POST',
			data      : {
				action        : 'reepay_refund',
				nonce         : nonce,
				order_id      : order_id,
				amount        : amount
			},
			beforeSend: function () {
				self.data('text', self.html());
				self.html(Reepay_Admin.text_wait);
				self.prop('disabled', true);
			},
			success   : function (response) {
				self.html(self.data('text'));
				self.prop('disabled', false);
				if (!response.success) {
					alert(response.data);
					return false;
				}

				window.location.href = location.href;
			},
			error	: function (response) {
				alert(response);
			}
		});
	});
	
	$(document).on('click', '#reepay_capture_partly', function (e) {
		e.preventDefault();
		var nonce = $(this).data('nonce');
		var order_id = $(this).data('order-id');
		var amount = $("#reepay-capture_partly_amount-field").val();
		var self = $(this);
		
		$.ajax({
			url       : Reepay_Admin.ajax_url,
			type      : 'POST',
			data      : {
				action        : 'reepay_capture_partly',
				nonce         : nonce,
				order_id      : order_id,
				amount        : amount
			},
			beforeSend: function () {
				self.data('text', self.html());
				self.html(Reepay_Admin.text_wait);
				self.prop('disabled', true);
			},
			success   : function (response) {
				self.html(self.data('text'));
				self.prop('disabled', false);
				if (!response.success) {
					alert(response);
					alert(response.data);
					return false;
				}
				window.location.href = location.href;
			},
			error	: function (response) {
				alert("error response: " + JSON.stringify(response));
			}
		});
	});
	
	$(document).on('click', '#reepay_refund_partly', function (e) {
		e.preventDefault();
		var nonce = $(this).data('nonce');
		var order_id = $(this).data('order-id');
		var amount = $("#reepay-refund_partly_amount-field").val();
		var self = $(this);
		
		$.ajax({
			url       : Reepay_Admin.ajax_url,
			type      : 'POST',
			data      : {
				action        : 'reepay_refund_partly',
				nonce         : nonce,
				order_id      : order_id,
				amount        : amount
			},
			beforeSend: function () {
				self.data('text', self.html());
				self.html(Reepay_Admin.text_wait);
				self.prop('disabled', true);
			},
			success   : function (response) {
				self.html(self.data('text'));
				self.prop('disabled', false);
				if (!response.success) {
					alert(response);
					alert(response.data);
					return false;
				}
				window.location.href = location.href;
			},
			error	: function (response) {
				alert("error response: " + JSON.stringify(response));
			}
		});
	});
	
	$(document).on('blur', '#reepay-capture_partly_amount-field', function (e) {
		var val = parseFloat($(this).val().replace(",", "."));
		$(this).val(val.toFixed(2).replace(".", ","));
	});
	
	$(document).on('blur', '#reepay-refund_partly_amount-field', function (e) {
		var val = parseFloat($(this).val().replace(",", "."));
		$(this).val(val.toFixed(2).replace(".", ","));
	});
});
