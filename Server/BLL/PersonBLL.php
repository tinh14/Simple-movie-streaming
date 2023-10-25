<?php
	require_once(dirname(__DIR__, 1) . "/DAL/PersonDAL.php");
	class PersonBLL {
		// Neu dang nhap thanh cong thi return true, else return error message
		public static function login($account){
			$account->pwd = md5($account->pwd);
			if (!PersonDAL::checkAccount($account)){
				return "Tài khoản hoặc mật khẩu không đúng!";
			}
			$user = PersonDAL::login($account);
			if ($user->username == "admin"){
				return $user;
			}

			$type = $user->avatar;
			$path = dirname(__DIR__) . "/Assets/Images/Users/" . $user->username . "." . $type;
			if (file_exists($path)){
				$file = file_get_contents($path);
				$base64_string = "data:image/" . $type . ";base64," . base64_encode($file);
				$user->avatar = $base64_string;
			}
			return $user;
		}

		public static function addUser($account, $user){
			$mess = PersonDAL::existAccount($account->username);
			if ($mess){
				return "Tên đăng nhập đã tồn tại!";
			}

			$account->pwd = md5($account->pwd);

			return PersonDAL::addUser($account, $user);
		}

		public static function changeUserInfor($user){
			return PersonDAL::changeUserInfor($user);
		}

		public static function changeUserPassword($account){
			$account->pwd = md5($account->pwd);
			return PersonDAL::changeUserPassword($account);
		}
	}
?>